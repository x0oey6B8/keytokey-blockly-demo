<script lang="ts" setup>

const props = defineProps<Props>();

function close() {
    if (!props.state.lock) {
        props.state.isShowing = false;
    }
}

export interface Props {
    state: IModalState;
}

export interface IModalState {
    isShowing: boolean;
    lock: boolean;
    stateChanged: () => void; 
}

</script>

<template>
    <Transition name="modal">
        <div v-if="props.state.isShowing" class="modal-mask" @click="close">
            <slot name="content"></slot>
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
    transition: opacity 0.0001s ease;
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