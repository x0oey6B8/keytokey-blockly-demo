<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

interface ISelectable {
    isSelected: boolean
}

class Command implements ICommandItem {
    canShow: boolean = true;
    id: string = crypto.randomUUID();
    header: string = "";
    subHeader?: string;
    elementType: ElementType = "COMMAND";
    callback?: () => void;
}

class CallableCommand extends Command implements ISelectable {
    isSelected: boolean = false;
}

class Separator extends Command {
}

class Label extends Command {
}

type ElementType = "COMMAND" | "SEPARATOR" | "LABEL";

export interface ICommandItem {
    header: string,
    subHeader?: string,
    elementType: ElementType,
    callback?: () => void
}

export interface Props {
    items: ICommandItem[],
    hint: string,
}

defineExpose({
    focus
})

onMounted(() => focus());

const props = defineProps<Props>();
const text = ref("")
const input = ref(null);
const commandItemsContainer = ref(null);
let selectedIndex = 0;

const emits = defineEmits<{
    (e: 'selected'): void
}>();

let commandItems = ref(createCommands());
selectFirstElement();

watch(() => props.items, () => {
    selectedIndex = 0;
    commandItems = ref(createCommands());
    selectFirstElement();
    focus();
})

function focus() {
    console.log(focus);
    if (input.value) {
        (input.value as HTMLElement)?.focus();
    }
}

function createCommands() {
    const commands: Command[] = props.items.map(commandItem => {
        if (commandItem.elementType === "LABEL") {
            const label = new Label();
            label.header = commandItem.header,
                label.elementType = "LABEL"
            return label as Command;
        } else if (commandItem.elementType === "SEPARATOR") {
            const separator = new Separator();
            separator.elementType = "SEPARATOR"
            return separator as Command;
        } else {
            const command = new CallableCommand();
            command.header = commandItem.header;
            command.subHeader = commandItem.subHeader;
            command.elementType = "COMMAND";
            command.callback = commandItem.callback;
            return command;
        }
    });
    return commands;
}

function filterCommandItemsWithInputWord() {
    // コマンド取得
    const commands = listCallableCommands();
    // 各コマンドのループ
    for (const command of commands) {
        // 選択状態を解除
        command.isSelected = false;
        // 検索テキストが空かnullの場合
        if (!text.value) {
            // コマンドを表示する
            command.canShow = true
        } else {
            // ヘッダーとサブヘッダーが検索テキストにマッチした場合にコマンドを表示する
            command.canShow =
                matchWord(command.header, text.value)
                || matchWord(command?.subHeader ?? "", text.value);
        }
    }
    // 表示可能なコマンドを取得
    const showableCommands = commands.filter(command => command.canShow);
    // コマンドが一つ以上ある場合
    if (showableCommands.length > 0) {
        // 最初のコマンドを選択
        showableCommands[0].isSelected = true;
        selectedIndex = 0;
    } else {
        // コマンドが一つもない場合は-1を設定
        selectedIndex = -1;
    }
    // 一番上までスクロールする
    if (commandItemsContainer?.value) {
        (commandItemsContainer.value as HTMLElement).scroll({top: 0,behavior: 'auto'})
    }
}

// 与えられた文字列が、指定された単語と一致するかを判定する関数
function matchWord(target: string, word: string) {
    // インデックス変数の初期化
    let i = 0;
    // 比較のためにターゲット文字列を小文字に変換
    target = target.toLowerCase(); 
    // 単語の各文字に対してループ
    for (const c1 of word.toLowerCase()) {
        // 一致フラグの初期化
        let isMached = false; 
        // ターゲット文字列を走査するループ
        for (; i < target.length; i++) {
            // ターゲット文字列の現在の文字
            const c2 = target[i];
            // 文字が一致する場合、一致フラグを立ててループ終了
            if (isMached = (c2 == c1)) {
                break;
            }
        }
        // 一致フラグが立っていない場合、指定された単語と一致しないため false を返す
        if (!isMached) {
            return false;
        }
        i++; // インデックスを次に進める
    }
    // すべての文字が一致した場合、指定された単語と一致するため true を返す
    return true;
}


function selectFirstElement() {
    const selectableCommands = listSelectableCommands();
    if (selectableCommands.length > 0) {
        (selectableCommands[0] as CallableCommand).isSelected = true;
    }
}

function listSelectableCommands() {
    const selectableCommands = listCallableCommands().filter(command => command.canShow);
    return selectableCommands;
}

function listCallableCommands() {
    const commands = commandItems.value.filter(command => command instanceof CallableCommand) as CallableCommand[];
    return commands;
}

function call(callback?: () => void) {
    emits('selected');
    if (callback) {
        callback();
    }
}

function enterPressed() {
    emits('selected');
    const selectableCommands = listSelectableCommands();
    const command = selectableCommands[selectedIndex];
    if (command.callback) {
        command.callback();
    }
}

function incrementSelectedIndex() {
    selectedIndex++;
    updateSelectedIndex();
}

function decrementSelectedIndex() {
    selectedIndex--;
    updateSelectedIndex();
}

function updateSelectedIndex() {
    const selectableCommands = listSelectableCommands();
    for (const command of selectableCommands) {
        command.isSelected = false;
    }
    if (selectedIndex >= selectableCommands.length) {
        selectedIndex = 0;
    }
    else if (selectedIndex < 0) {
        selectedIndex = selectableCommands.length - 1;
    }
    const command = selectableCommands[selectedIndex];
    command.isSelected = true;
    scrollIntoSelectedIndex(command.id);
}

function scrollIntoSelectedIndex(id: string) {
    const element = document.getElementById(id) as HTMLElement;
    //const container = commandItemsContainer.value as HTMLElement;
    element.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'center'
    });
}

function isSelected(command: Command) {
    if (!(command instanceof CallableCommand)) {
        return false;
    } else {
        return (command as CallableCommand).isSelected;
    }
}

</script>

<template>
    <div class="command-container">
        <div class="command-horizontal-center">
            <input class="command" type="text" ref="input" 
            v-model="text" 
            :placeholder="props.hint"
            @update:model-value="() => filterCommandItemsWithInputWord()"
            @keypress.enter="enterPressed"
            @keydown.up="decrementSelectedIndex"
            @keydown.down="incrementSelectedIndex">
        </div>
        <div class="command-items scrollbar" ref="commandItemsContainer">
            <div v-for="command in commandItems" :key="command.id">
                <div v-if="command.elementType === 'COMMAND' && command.canShow"
                    class="command-item"
                    :class="{ selected: isSelected(command) }"
                    :id="command.id"
                    @click="call(command.callback)">
                    <div class="command-item-header" >{{ command.header }}</div>
                    <div v-if="command.subHeader" class="command-item-sub-header">{{ command.subHeader }}</div>
                </div>
                <div v-else-if="command.elementType === 'SEPARATOR'">
                    <hr class="separator"/>
                </div>
                <div v-else-if="command.elementType === 'LABEL'">
                    <div class="command-item-header label">
                        {{ command.header }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .command {
        width: 100%;
        padding: 3px 10px;
        display: flex;
        justify-content: center;
        height: 20px;
        background-color: #212121;
        border: solid 1px rgb(28, 107, 211);
        border-radius: 2px;
        outline: none;
        color: #E7E7E7;
    }

    .command-horizontal-center {
        display: flex;
        justify-content: center;
        padding: 8px 10px 5px 10px;
    }

    .command-container {
        width: 100%;
        height: auto;
        max-height: 450px;
        background-color: #212121;
        border-radius: 5px;
        border: solid 1px #424242;
        display: grid;
        grid-template-rows: auto 1fr;
    }

    .scrollbar {
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
    
    .command-items {
        overflow-y: scroll;
        grid: 1;
        padding-left: 5px;
        padding-bottom: 5px;
    }

    .command-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 5px 10px;
        margin-right: 5px;
        user-select: none;
        min-height: 25px;
        border-radius: 4px;
    }

    .selected {
        background-color: #70666640;
    }

    .command-item:hover {
        background-color: #42424260;
        cursor: pointer;
    }

    .command-item-header {
        color: #D7D7D7;
        font-size: 13px;
        /* font-family: initial; */
        font-weight: normal;
    }

    .command-item-sub-header {
        color: #777777;
        font-size: 13px;
        /* font-family: initial; */
        font-weight: normal;
        word-wrap: break-word;
    }

    .separator {
        border: solid 0px #77777790;
        height: 1px;
        margin-right: 6px;
        background-color: #77777790;
        user-select: none;
    }

    .label {
        color: #777777;
        display: flex;
        justify-content: center;
        user-select: none;
    }
</style>
