<script lang="ts" setup>
import Modal from "./Modal.vue"
import CommandPalette from "./CommandPalette.vue"
import { ICommandItem, ICommandTextValidationResult } from "../models/commandPalette";
import { IModalState } from "../models/modal";

const props = defineProps<{
    modalState: IModalState,
    items: ICommandItem[],
    hint: string,
    text: string,
    filtering: boolean,
    closeAuto: boolean,
    textValidator: (text: string) => Promise<ICommandTextValidationResult>
}>();

const emits = defineEmits<{
    (e: "text-updated", text: string): void
}>()

function closeModal() {
    if (props.closeAuto) {
        props.modalState.isShowing = false;
    }
}

function updateText(newText: string) {
    emits("text-updated", newText);
}

</script>

<template>
    <Modal :state="props.modalState">
        <template #content>
            <div class="modal-command">
                <div class="modal-command-top">
                    <CommandPalette
                        @click.stop
                        @selected="closeModal"
                        @escape-pressed="closeModal"
                        @text-updated="updateText"
                        :text="props.text"
                        :hint="props.hint"
                        :items="props.items"
                        :filtering="props.filtering"
                        :text-validator="props.textValidator">
                    </CommandPalette>
                </div>
            </div>
        </template>
    </Modal>
</template>

<style lang="css" scoped>
.modal-command {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.modal-command-top {
    margin-top: 2px;
    display: flex;
    justify-content: center;
    align-items: start;
    width: 50%;
    max-width: 500px;
    height: 50%;
    max-height: 550px;
}
</style>