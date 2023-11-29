<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { ICallbackArgs, ICommandItem, ICommandTextValidationResult } from '../models/commandPalette';

const props = defineProps<{
    items: ICommandItem[],
    hint: string,
    text: string,
    filtering: boolean,
    textValidator: (text: string) => Promise<ICommandTextValidationResult>,
}>();
const emits = defineEmits<{
    (e: 'selected'): void,
    (e: 'escape-pressed'): void,
    (e: 'text-updated', text: string): void,
}>();
const commandText = ref(null);
const commandItemsContainer = ref(null);
const defaultTextValidationResult: ICommandTextValidationResult = {
    isValid: true,
    validationMessage: ""
};
const internalText = ref(props.text);
const textValidationResult = ref<ICommandTextValidationResult>(defaultTextValidationResult);

let selectedIndex = 0;
let commandItems = ref(props.items);

selectFirstCommandItem();
if (props.filtering) {
    filterCommandItems();
}

defineExpose({ focus })
onMounted(() => focus());
watch(() => props.items, () => {
    internalText.value = props.text;
    textUpdated();
    commandItems = ref(props.items);
    if (props.filtering) {
        filterCommandItems();
    }
    selectFirstCommandItem();
    focus();
})

function focus() {
    if (commandText.value) {
        (commandText.value as HTMLElement)?.focus();
    }
}

function selectFirstCommandItem() {
    const showableCommandItems = listShowableCommandItems();
    if (showableCommandItems.length > 0) {
        showableCommandItems[0].isSelected = true;
        selectedIndex = 0;
    } else {
        selectedIndex = -1;
    }
}

function scrollIntoSelectedIndex(id: string) {
    const element = document.getElementById(id) as HTMLElement;
    element.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'center'
    });
}

function scrollToTop() {
    if (commandItemsContainer?.value) {
        (commandItemsContainer.value as HTMLElement).scroll({ top: 0, behavior: 'auto' })
    }
}

async function textUpdated() {

    emits("text-updated", internalText.value);

    if (props.filtering) {
        filterCommandItems();
    }

    const validator = props.textValidator;
    textValidationResult.value = validator ? await validator(internalText.value) : defaultTextValidationResult;
}

// コマンドアイテムをフィルタリングする関数の定義
function filterCommandItems() {
    // コールバック引数の定義
    const args: ICallbackArgs = {
        // テキストフィールドの値を取得してtextプロパティに設定
        text: internalText.value,
        // バリデーション結果を設定するコールバック関数を定義
        setValidationResult: result => textValidationResult.value = result
    }

    // コマンドの表示を更新するループ
    for (const commandItem of commandItems.value) {

        // コマンドの選択と表示をリセット
        commandItem.isSelected = false;
        commandItem.canShow = true;

        // コマンドがcanShowを更新するメソッドを持っている場合
        if (commandItem.updateCanShow) {
            // コマンドのcanShowを更新し、表示できない場合はスキップ
            commandItem.canShow = commandItem.updateCanShow(args);
            if (!commandItem.canShow) {
                continue;
            }
        }

        // elementTypeがCOMMANDの場合にのみテキストフィルタリングを適用する
        if (commandItem.elementType === "COMMAND") {
            // 入力テキストが空またはnullの場合、
            // ヘッダーとサブヘッダーが入力テキストと一致した場合にコマンドを表示する
            commandItem.canShow =
                !internalText.value
                || matchWord(commandItem.header, internalText.value)
                || matchWord(commandItem?.subHeader ?? "", internalText.value);
        }
    }

    // 表示可能なコマンドを取得
    const showableCommands = listCommandItems().filter(command => command.canShow);
    // 非コマンドを取得
    const nonCommands = listNonCommandItems().filter(nonCommand => nonCommand.canShow);
    for (const nonCommand of nonCommands) {
        const groupTag = nonCommand.groupTag;
        if (groupTag) {
            // 非コマンドのグループタグと表示可能なコマンドのグループタグが一致する場合にのみ非コマンドを表示するようにする
            const groupedCommands = showableCommands.filter(command => command.groupTag == groupTag);
            nonCommand.canShow = groupedCommands.length > 0;
        }
    }

    // 最初のコマンドを選択
    selectFirstCommandItem();
    
    // スクロールの位置を最初にする
    scrollToTop();
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

function listShowableCommandItems() {
    const showableCommandItems = listCommandItems().filter(command => command.canShow);
    return showableCommandItems;
}

function listCommandItems() {
    const commands = commandItems.value.filter(command => command.elementType === "COMMAND");
    return commands;
}

function listNonCommandItems() {
    const commands = commandItems.value.filter(command => command.elementType !== "COMMAND");
    return commands;
}

function invokeCallback(commandItem: ICommandItem) {
    emits('selected');
    if (commandItem === undefined) {
        return;
    }
    if (commandItem.callback) {
        if (textValidationResult.value.isValid) {
            commandItem.callback({
                text: internalText.value,
                setValidationResult: result => textValidationResult.value = result
            });
        }
    }
}

function escapePressed() {
    emits("escape-pressed");
}

function enterPressed() {
    emits('selected');
    const showableCommandItems = listShowableCommandItems();
    const commandItem = showableCommandItems[selectedIndex];
    invokeCallback(commandItem);
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
    const showableCommandItems = listShowableCommandItems();
    for (const command of showableCommandItems) {
        command.isSelected = false;
        command.onUnselected?.(command);
    }

    if (showableCommandItems.length <= 0) {
        return;
    }

    if (selectedIndex >= showableCommandItems.length) {
        selectedIndex = 0;
    }
    else if (selectedIndex < 0) {
        selectedIndex = showableCommandItems.length - 1;
    }
    const command = showableCommandItems[selectedIndex];
    command.isSelected = true;
    command.onSelected?.(command);
    scrollIntoSelectedIndex(command.id);
}

</script>

<template>
    <div class="command-container">
        <div class="command-horizontal-center">
            <input class="command" type="text" ref="commandText" 
                v-model="internalText"
                :class="{ 'invalid-command': !textValidationResult.isValid }"
                :placeholder="props.hint"
                @update:model-value="textUpdated"
                @keypress.enter="enterPressed"
                @keydown.esc="escapePressed"
                @keydown.up="decrementSelectedIndex"
                @keydown.down="incrementSelectedIndex">
            <div class="validation-message" v-if="!textValidationResult.isValid && textValidationResult.validationMessage">
                {{ textValidationResult.validationMessage }}
            </div>
        </div>
        <div v-if="listShowableCommandItems().length > 0" class="command-items scrollbar" ref="commandItemsContainer">
            <div v-for="command in commandItems"
                :key="command.id"
                @mouseenter="command.onMouseEnter?.(command)"
                @mouseleave="command.onMouseLeave?.(command)">
                <div v-if="command.canShow">
                    <div v-if="command.elementType === 'COMMAND'"
                        class="command-item"
                        :class="{ selected: command.isSelected }"
                        :id="command.id"
                        @click="invokeCallback(command)">
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
    </div>
</template>

<style lang="css" scoped>
    .command {
        width: auto;
        padding: 3px 8px;
        height: 20px;
        background-color: #212121;
        border: solid 1px rgb(28, 107, 211);
        border-radius: 2px;
        outline: none;
        color: #E7E7E7;
    }

    .command::-webkit-input-placeholder {
        font-family: Noto Sans Jp;
    }

    .invalid-command {
        border: solid 1px #FDD835;
    }

    .command-horizontal-center {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 10px;
    }

    .command-container {
        width: 100%;
        height: auto;
        max-height: 450px;
        background-color: #212121;
        border-radius: 5px;
        border: solid 1px #424242;
        display: grid;
        grid-template-rows: auto auto 1fr;
    }

    .validation-message {
        color: #FDD835;
        font-family: initial;
        font-size: 14px;
        margin: 0;
        line-height: 1em;
        margin-top: 14px;
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
        margin-bottom: 5px;
        margin-top: 5px;
        background-color: #77777790;
        user-select: none;
    }

    .label {
        color: #777777;
        display: flex;
        justify-content: center;
        user-select: none;
        padding: 3px 0;
    }
</style>