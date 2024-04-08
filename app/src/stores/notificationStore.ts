import { defineStore } from "pinia"
import { Id, ToastOptions, toast } from "vue3-toastify"
import 'vue3-toastify/dist/index.css';
import { ModalStateFactory } from "../models/modal";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {

    const topMessageModal = ref(ModalStateFactory.create());
    const topMessage = ref("");
    return {
        topMessage,
        topMessageModal,
        toastMessage,
        loading,
        done,
        info,
        success,
        error,
        warning,
        warningTopCenter,
        remove,
    }

    function toastMessage(message: string, options: ToastOptions = {
        autoClose: 3000,
        theme: "colored",
        type: "info",
        pauseOnFocusLoss: false,

    }) {
        return toast(message, options);
    }

    function loading(message: string, options: ToastOptions) {
        return toast.loading(message, options);
    }

    function done(id: Id) {
        toast.remove(id);
    }

    function remove(toastId: number) {
        toast.remove(toastId);
    }

    function error(message: string, options: ToastOptions = {
        autoClose: 3000,
        theme: "colored",
        type: "error",
        pauseOnFocusLoss: false,
    }) {
        return toast(message, options);
    }

    function info(message: string, options: ToastOptions = {
        autoClose: 3000,
        theme: "colored",
        type: "info",
        pauseOnFocusLoss: false,
    }) {
        return toast(message, options);
    }

    function success(message: string, options: ToastOptions = {
        autoClose: 3000,
        theme: "colored",
        type: "success",
        pauseOnFocusLoss: false,
    }) {
        return toast(message, options);
    }

    function warning(message: string, options: ToastOptions = {
        autoClose: 3000,
        theme: "colored",
        type: "warning",
        pauseOnFocusLoss: false,
        toastClassName: "vue3-toastify-font-color-black"
    }) {
        return toast(message, options);
    }

    function warningTopCenter(message: string, options: ToastOptions = {
        autoClose: 3000,
        theme: "colored",
        type: "warning",
        toastClassName: "vue3-toastify-font-color-black",
        position: "top-center",
        pauseOnFocusLoss: false,
    }) {
        return toast(message, options);
    }
});