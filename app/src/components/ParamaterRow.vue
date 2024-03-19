<script lang="ts" setup>
import { ValueType } from '../hosts/macroManager';
import { IValueType } from './ModalParameterEditor.vue';

const props = defineProps<{
    tableProps: any,
    valueTypes: IValueType[],
}>();

function getValueColor(valueType: ValueType) {
    const def = props.valueTypes.find(t => t.value === valueType);
    const color = def?.fontColor ?? "";
    const style = { color };
    return style
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
                :options="valueTypes"
                :option-value="opt => opt.value">
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
                color="green"
                class="full-width"
                lazy-rules>
                <q-menu touch-position context-menu>
                    <q-list dense style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section>Open...</q-item-section>
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
