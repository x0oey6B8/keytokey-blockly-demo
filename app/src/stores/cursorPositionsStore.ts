import { defineStore } from "pinia";
import { ModalStateFactory } from "../models/modal";
import { ref } from "vue";
import { host } from "../hosts/host";
import { InputType } from "../hosts/listener";
import { keys } from "../definitions/blocks/keys";

export const useCursorPositionsStore = defineStore("cursor-positions", () => {

    const modal = ref(ModalStateFactory.create());
    const isLogging = ref(false);
    const rows = ref<ILoggedCursorPosition[]>([]);
    const isWaitingForInput = ref(false);
    const keyName = ref("");


    return {
        modal,
        isLogging,
        rows,
        keyName,
        isWaitingForInput,
        close,
        open,
        start,
        stop,
        receive,
        clear,
        changeKey,
        loadTrigger
    }

    async function loadTrigger() {
        const name = await host.listener.getTrigger();
        setTrigger(name);
    }

    function setTrigger(newKeyName: string) {
        console.log("new trigger", newKeyName);
        const name = keys.find(key => key[1] === newKeyName)?.[0];
        if (name) {
            keyName.value = name as string;
        }
    }

    function receive(jsonStr: string) {
        const loggedPosition: ILoggedCursorPosition = JSON.parse(jsonStr);
        rows.value.splice(0, 0, loggedPosition);
    }

    async function changeKey() {
        isWaitingForInput.value = true;
        const input = await host.listener.waitForInput({ listenType: InputType.KeyboardOrMouse });
        host.listener.changeTrigger(input.name);
        setTrigger(input.name);
        isWaitingForInput.value = false;
    }

    function start() {
        isLogging.value = true;
        host.listener.startToLogCursorPositions();
    }

    function stop() {
        isLogging.value = false;
        host.listener.stopLoggingCursorPositions();
    }

    function open() {
        if (modal.value.isShowing) {
            return;
        }
        modal.value.isShowing = true;
    }

    function close() {
        modal.value.isShowing = false;
        stop();
    }

    function clear() {
        rows.value.length = 0;
    }
});

export interface ICursorPoint {
    x: number;
    y: number;
}

export interface ILoggedCursorPosition {
    point: ICursorPoint;
    activeWindowBased: IActiveWindowBased;
}

export interface IActiveWindowBased {
    point: ICursorPoint;
    pointWithoutTitlebar: ICursorPoint;
    percentagePoint: ICursorPoint;
    percentagePointWithoutTitlebar: ICursorPoint;
}