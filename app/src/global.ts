import { useAppStore } from "./stores/appStore";

export function registerGlobal() {
    const global = (window as any);

    global.profileChanged = () => {
        const appStore = useAppStore();
        appStore.clear();
    };
}