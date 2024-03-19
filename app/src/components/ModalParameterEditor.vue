<script lang="ts" setup>
import Modal from "./Modal.vue"
import { QTableProps } from "quasar";
import { useParameterEditorStore } from "../stores/parameterEditor";
import { ref, watch } from "vue";
import { useEditingMacro } from "../stores/editingMacro";
import { ValueType, ValueTypeToDefaultValue, ValueTypeToName } from "../hosts/macroManager";
import ParameterRow from "./ParamaterRow.vue"

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

function apply() {
    const macro = editing.macro;
    if (macro?.debouncedApplySetting) {
        macro.debouncedApplySetting();
    }
}

export interface IValueType {
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
                                引数を設定するとマクロを割り当てる際マクロの選択画面に各引数の値入力欄が表示されます。<br>
                                設定された値は実行時、引数と同じ名前の変数ブロックに格納されます。<br>
                                <img src="../assets/ss/param/param1.png" width="50%" height="50%"/>

                                <h5 class="q-mt-ex q-mb-sm">設定方法</h5>
                                「ここから実行」関数ブロック左の歯車アイコンから引数の設定が可能です。<br>
                                引数の設定後、再度この画面を表示することで詳細設定を行うことができます。<br>
                                <img src="../assets/ss/param/param2.png"/>
                            </div>
                            <q-table 
                                v-if="store.rows.length > 0"
                                :columns="columns"
                                :rows="store.rows"
                                :pagination="{ rowsPerPage: 0 }"
                                hide-bottom
                                hide-top>
                                <template #body="props">
                                    <ParameterRow :table-props="props" :value-types="valueTypes"></ParameterRow>
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
        width: 95%;
        height: 95%;
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

</style>
