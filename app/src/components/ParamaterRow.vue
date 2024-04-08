<script lang="ts" setup>
import { ref } from 'vue';
import { host } from '../hosts/host';
import { InputType } from '../hosts/listener';
import { ValueType, ValueTypeToDefaultValue } from '../hosts/macroManager';
import { IValueType } from './ModalParameterEditor.vue';

const props = defineProps<{
    tableProps: any,
    valueTypes: IValueType[],
}>();

const blinking = ref(false);

const menus: IParameterRowContextMenu[] = [
    {
        valueType: "NUMBER",
        menuItems: []
    },
    {
        valueType: "STRING",
        menuItems: []
    },
    {
        valueType: "BOOLEAN",
        menuItems: [
            {
                header: "はい／有効／正しい",
                callback: (rowProps) => {
                    rowProps.defaultValue = "True";
                }
            },
            {
                header: "いいえ／無効／正しくない",
                callback: (rowProps) => {
                    rowProps.defaultValue = "False";
                }
            }
        ]
    },
    {
        valueType: "KEYS",
        menuItems: [
            {
                header: "キー／マウスを入力して値をセットする",
                callback: async (rowProps) => {
                    blinking.value = true;
                    rowProps.defaultValue = "キー／マウスを入力してください"
                    const result = await host.listener.waitForInput({ listenType: InputType.KeyboardOrMouse });
                    rowProps.defaultValue = `Keys.${result.name}`;
                    blinking.value = false;
                }
            },
        ]
    },
]

function getValueColor(valueType: ValueType) {
    const def = props.valueTypes.find(t => t.value === valueType);
    const color = def?.fontColor ?? "";
    const style = { color };
    return style
}

function setDefaultValue(type: ValueType, row: any) {
    row.defaultValue = ValueTypeToDefaultValue.convert(type);
}

interface IParameterRowContextMenu {
    valueType: ValueType,
    menuItems: IParameterRowContextMenuItem[]
}

interface IParameterRowContextMenuItem {
    header: string;
    callback: (rowProps: any) => void;
}

</script>

<template>
    <q-tr :props="tableProps">
        <q-td auto-width key="name" :props="tableProps" class="text-left name"><span class="font-size-14 text-grey-6">{{ tableProps.row.name }}</span></q-td>
        <q-td auto-width key="type" :props="tableProps">
            <q-select 
                filled
                dense
                color="green"
                v-model="tableProps.row.valueType" 
                emit-value
                map-options
                style="width: 160px"
                :options="valueTypes"
                :option-value="opt => opt.value"
                @update:model-value="valueType => setDefaultValue(valueType, tableProps.row)">
                <!-- 選択アイテム -->
                <template v-slot:selected-item="scope">
                    <div :class="scope.opt.valueTypeClass">
                        <span class="q-px-sm">{{ scope.opt.label }}</span>
                    </div>
                </template>
                <!-- ドロップダウンの各アイテム -->
                <template v-slot:option="{ itemProps, opt }">
                    <q-item v-bind="itemProps">
                        <q-item-section :class="opt.valueTypeClass">
                            <q-item-label v-html="opt.label" class="q-px-sm" />
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
        </q-td>
        <q-td key="defaultValue" :props="tableProps" class="text-grey-3">
            <q-input
                dense
                filled
                v-model="tableProps.row.defaultValue"
                :input-style="getValueColor(tableProps.row.valueType)"
                :class="{'blinking': blinking}"
                color="green"
                class="full-width"
                lazy-rules>
                <q-menu touch-position context-menu>
                    <q-list dense style="min-width: 100px">
                        <q-item clickable v-close-popup
                            v-for="menuItem of menus.find(menu => menu.valueType === tableProps.row.valueType)?.menuItems"
                            @click="menuItem.callback(tableProps.row)">
                            <q-item-section class="font-size-14 q-pa-sm">
                                {{ menuItem.header }}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-input>
        </q-td>
        <q-td key="description" :props="tableProps" class="text-grey-3">
            <q-input
                dense
                filled
                v-model="tableProps.row.description"
                lazy-rules
                class="q-py-none"
                color="green"
                />
        </q-td>
    </q-tr>
</template>

<style lang="css" scoped>
    .t_number {
        border-left: solid 10px #E91E63;
    }

    .t_keys {
        border-left: solid 10px #FFEB3B;
    }

    .t_boolean {
        border-left: solid 10px #2196F3;

    }

    .t_string {
        border-left: solid 10px #FF9800;

    }

    .t_any {
        border-left: solid 10px #673AB7;

    }

    .v-value {
        color: #E91E63 !important;
    }

    .v_boolean {
        color: #2196F3 !important;
    }

    .v_string {
        color: #FF9800 !important;
    }

    .name {
        min-width: 5%;
        max-width: 30%;
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .quote-space {
        width: 20px;
        max-width: 20px;
        min-width: 20px;
    }
</style>
