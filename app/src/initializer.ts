import { host } from "./hosts/host";
import { useAppStore } from "./stores/appStore";
import { useCursorPositionsStore } from "./stores/cursorPositionsStore";

export function initialize() {
    registerGlobal();
    clearListenerEvents();
}

export function registerGlobal() {
    const global = (window as any);

    global.profileChanged = () => {
        const appStore = useAppStore();
        appStore.clear();
    };

    global.addLoggedCursorPosition = (jsonStr: string) => {
        const store = useCursorPositionsStore();
        store.receive(jsonStr);
    }
}

export function clearListenerEvents() {
    host.listener.stopLoggingCursorPositions();
}