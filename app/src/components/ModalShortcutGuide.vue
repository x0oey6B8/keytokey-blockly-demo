<script lang="ts" setup>
import Modal from "./Modal.vue"
import KBD from "./KBD.vue"
import { QTableProps } from "quasar";
import { useAppStore } from "../stores/appStore";

console.log("shortcut");
const appStore = useAppStore();

const columns: QTableProps["columns"] = [
    { name: "keys", align: "left", field: "keys", label: "", style: "width: 200px;" },
    { name: "description", align: "left", field: "description", label: "" },
];

const shortcutGroups: IShortcutGroup[] = [
    {
        id: 0,
        name: "全般",
        shortcuts: [
            { keys: ["Ctrl", "M"], description: "マクロの一覧を開く" },
            { keys: ["Ctrl", "P"], description: "右上のドロップダウンメニューの一覧を開く" },
            { keys: ["Ctrl", "Tab"], description: "タブのクイック切り替え" },
        ]
    },
    {
        id: 1,
        name: "ワークスペース",
        shortcuts: [
            { keys: ["Ctrl", "Z"], description: "戻す" },
            { keys: ["Ctrl", "Y"], description: "戻すの取り消し" },
            { keys: ["Ctrl", "C"], description: "選択したブロックのコピー" },
            { keys: ["Ctrl", "V"], description: "コピーしたブロックの貼り付け" },
            { keys: ["Ctrl", "D"], description: "選択したブロックの複製" },
            { keys: ["Delete"], description: "選択したブロックの削除" },
            { keys: ["BackSpace"], description: "選択したブロックの削除" },
            { keys: ["Tab"], description: "入力フィールドのフォーカス移動" },
            { keys: ["Shift", "Tab"], description: "入力フィールドのフォーカス移動（逆）" },
        ]
    },
]

interface IShortcutGroup {
    id: number,
    name: string,
    shortcuts: IShortcut[]
}

interface IShortcut {
    keys: string[],
    description: string
}


</script>

<template>
    <Modal :state="appStore.shortcutPage">
        <template #content>
            <div class="entire">
                <div class="center-panel scrollbar rounded" @click.stop>
                    <div class="header q-pb-sm q-pt-lg">
                        <span>ショートカット一覧</span>
                    </div>
                    <div v-for="group in shortcutGroups" class="q-pa-lg">    
                        <p>{{ group.name }}</p>
                        <q-table 
                            :columns="columns"
                            :rows="group.shortcuts"
                            :pagination="{ rowsPerPage: 0 }"
                            wrap-cells
                            hide-header
                            hide-bottom>
                            <template #body="props">
                                <q-tr :props="props">
                                    <q-td key="keys" :props="props">
                                        <KBD :keys='props.row.keys'></KBD>
                                    </q-td>
                                    <q-td key="description" :props="props">
                                            {{ props.row.description }}
                                    </q-td>
                                </q-tr>
                            </template>
                        </q-table>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<style lang="css" scoped>
    .q-dark {
        background: var(--bg-color-app) !important;
    }

    .entire {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
    }

    .center-panel {
        width: 620px;
        height: 600px;
        background-color: var(--bg-color-app);
        overflow-y: scroll;
        border: 1px solid var(--border-color);
    }

    .header {
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .scrollbar::-webkit-scrollbar {
        background-color: transparent;
        width: 12px;
    }

    .scrollbar::-webkit-scrollbar-thumb {
        background-color: #EEEEEE10;
    }

    .scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #EEEEEE40;
    }
</style>
