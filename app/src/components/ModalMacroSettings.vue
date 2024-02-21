<script lang="ts" setup>
import { useMacroSettingsStore } from "../stores/useMacroSettingsStore";
import Modal from "./Modal.vue"
import MacroSettings from "./MacroSettings.vue"
const configuration = useMacroSettingsStore();
</script>

<template>
    <Modal :state="configuration.modalState">
        <template #content>
            <MacroSettings></MacroSettings>
        </template>
    </Modal>
</template>