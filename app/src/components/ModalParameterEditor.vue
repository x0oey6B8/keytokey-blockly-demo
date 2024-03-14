<script lang="ts" setup>
import Modal from "./Modal.vue"
import { QTableProps } from "quasar";
import { useParameterEditorStore } from "../stores/parameterEditor";
import { ref, watch } from "vue";
import { useEditingMacro } from "../stores/editingMacro";
import { ValueType, ValueTypeToDefaultValue, ValueTypeToName } from "../hosts/macroManager";

const store = useParameterEditorStore();
const editing = useEditingMacro();
const columns: QTableProps["columns"] = [
    { name: "name", align: "center", field: "keys", label: "名前", style: "min-width: 150px; max-width: 200px;", headerClasses:"font-size-14" },
    { name: "type", align: "center", field: "type", label: "値の種類", headerClasses: "font-size-14" },
    { name: "defaultValue", align: "center", field: "defaultValue", label: "初期値", headerClasses: "font-size-14" },
    { name: "description", align: "center", field: "description", label: "説明", headerClasses: "font-size-14" },
];

const valueTypes = ref([
    {
        label: ValueTypeToName.convert("NUMBER"),
        value: "NUMBER",
        valueTypeClass: "t_number",
        fontColor: "#DFFFBB"
    },
    {
        label: ValueTypeToName.convert("STRING"),
        value: "STRING",
        valueTypeClass: "t_string",
        fontColor: "#FF9800"
    },
    {
        label: ValueTypeToName.convert("BOOLEAN"),
        value: "BOOLEAN",
        valueTypeClass: "t_boolean",
        fontColor: "#2196F3"
    },
    {
        label: ValueTypeToName.convert("KEYS"),
        value: "KEYS",
        valueTypeClass: "t_keys",
        fontColor: "#DFFFBB"
    },
    {
        label: ValueTypeToName.convert("ANY"),
        value: "ANY",
        valueTypeClass: "t_any",
        fontColor: ""
    },
] as IValueType[]);

watch(() => store.rows, (rows) => {
    for (const row of rows) {
        watch(() => row.defaultValue, () => apply());
        watch(() => row.valueType, () => {
            row.defaultValue = ValueTypeToDefaultValue.convert(row.valueType as ValueType);
            apply();
        });
        watch(() => row.description, () => apply());
    }
});

function getValueColor(valueType: ValueType) {
    const def = valueTypes.value.find(t => t.value === valueType);
    const color = def?.fontColor ?? "";
    const style = { color };
    return style
}

function apply() {
    const macro = editing.macro;
    if (macro?.debouncedApplySetting) {
        macro.debouncedApplySetting();
    }
}

interface IValueType {
    label: string;
    value: ValueType;
    valueTypeClass: string;
    fontColor: string;
}
</script>

<template>
    <Modal :state="store.modal">
        <template #content>
            <div class="entire">
                <div class="container" @click.stop>
                    <div class="grid q-pa-lg full-height">
                        <div class="flex justify-center q-mb-md">
                            <h6 class="q-ma-none self-center">「マクロ選択画面」に表示する引数の設定</h6>
                            <!-- <q-btn flat size="medium" color="green">ヘルプ</q-btn> -->
                        </div>
                        <div class="scrollbar q-pr-sm">
                            <div v-if="store.rows.length < 1" class="q-pa-lg text-grey-4">
                                <h5 class="q-my-none q-mb-sm">お知らせ</h5>
                                <span class="text-red">「ここから実行」</span>関数ブロックに引数が設定されていません。<br>

                                <h5 class="q-mt-ex q-mb-sm">引数とは</h5>
                                マクロ実行時、マクロから値を受け取ることができる機能です。<br>
                                引数を設定するとマクロを割り当てる際マクロの選択画面において各引数の値の入力欄が表示されます。<br>
                                ブロックが受け取る値は実行時に各引数名の変数ブロックに格納されます。<br>

                                <h5 class="q-mt-ex q-mb-sm">設定方法</h5>
                                「ここから実行」関数ブロック左の歯車アイコンから引数の設定が可能です。<br>
                                引数の設定後、再度この画面を表示することで詳細設定を行うことができます。
                            </div>
                            <q-table 
                                v-if="store.rows.length > 0"
                                :columns="columns"
                                :rows="store.rows"
                                :pagination="{ rowsPerPage: 0 }"
                                hide-bottom
                                hide-top>
                                <template #body="props">
                                    <q-tr :props="props">
                                        <q-td auto-width key="name" :props="props" class="text-left name"><span class="font-size-14 text-grey-6">{{ props.row.name  }}</span></q-td>
                                        <q-td auto-width key="type" :props="props">
                                            <q-select 
                                                filled
                                                dense
                                                color="green"
                                                v-model="props.row.valueType" 
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
                                        <q-td key="defaultValue" :props="props" class="text-grey-3">
                                            <q-input
                                                dense
                                                filled
                                                v-model="props.row.defaultValue"
                                                :input-style="getValueColor(props.row.valueType)"
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
                                        <q-td key="description" :props="props" class="text-grey-3">
                                            <q-input
                                                dense
                                                filled
                                                v-model="props.row.description"
                                                lazy-rules
                                                class="q-py-none"
                                                color="green"
                                                />
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </div>
                        <div class="flex justify-end q-ma-md">
                            <q-btn color="green" class="q-px-lg" @click="store.modal.isShowing = false">閉じる</q-btn>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<style lang="css" scoped>

    .entire {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .q-dark {
        background: var(--bg-color-app) !important;
    }

    .bg-dropdown{
        background: var(--bg-menu);
    }

    .container {
        width: 80%;
        height: 80%;
        border-radius: 10px;
        /* background: var(--bg-menu); */
        background: var(--bg-color-app);
        border: solid 1px var(--border-color);
    }

    .grid {
display: grid;
        flex-direction: column;
        grid-template-rows: auto 1fr auto;
    }

    .scrollbar {
        overflow: scroll;
        grid-row: 2;
    }

    .scrollbar::-webkit-scrollbar {
        background-color: transparent !important;
        width: 12px;
    }

    .scrollbar::-webkit-scrollbar-corner {
        background-color: transparent !important;
    }

    .scrollbar::-webkit-scrollbar-track {
        background-color: transparent !important;
    }

    .scrollbar::-webkit-scrollbar:vertical {
        background-color: transparent !important;
    }

    .scrollbar::-webkit-scrollbar-thumb {
        background-color: #EEEEEE10;
    }

    .scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #EEEEEE40;
    }

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
