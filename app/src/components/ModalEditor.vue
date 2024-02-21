<script lang="ts" setup>
import Modal from "./Modal.vue"
import Editor from "./Editor.vue";
import { IModalState } from "../models/modal";

const props = defineProps<{ modalState: IModalState }>();
</script>

<template>
    <Modal :state="props.modalState">
        <template #content>
            <div class="editor-root-container">
                <div class="editor-sub-container" @click.stop>
                    <Editor></Editor>
                </div>
            </div>
        </template>
    </Modal>
</template>

<style lang="css" scoped>
.editor-root-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.editor-sub-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80%;
}
</style>
