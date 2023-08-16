<script lang="ts" setup>
import Modal, { IModalState } from "./Modal.vue"
import Command, { ICommandItem } from "./Command.vue"

const props = defineProps<{
    modalState: IModalState,
    items: ICommandItem[],
    hint: string
}>();
</script>

<template>
    <Modal :state="props.modalState">
        <template #content>
            <div class="modal-command">
                <div class="modal-command-top">
                    <Command
                        @click.stop
                        @selected="props.modalState.isShowing = false"
                        :hint="props.hint"
                        :items="props.items">
                    </Command>
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
