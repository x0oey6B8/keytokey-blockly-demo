<script lang="ts" setup>
const props = defineProps({
    show: Boolean,
    lock: Boolean
})

const emit = defineEmits<{
    close: []
}>()

function close() {
    if (!props.lock) {
        emit('close');
    }
}

</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask" @click="close">
            <div class="modal-container" @click.stop>
                <slot name="content"></slot>
            </div>
        </div>
    </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(10, 10, 10, 0.7);
    display: flex;
    transition: opacity 0.1s ease;
}

.modal-container {
    width: 80%;
    height: 80%;
    margin: auto;
    padding: 5px;
    background-color: #3d3d3d;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    transition: all 0.1s ease;
    color: rgba(255, 255, 255, 0.781);
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>