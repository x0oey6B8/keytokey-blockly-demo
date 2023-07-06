import { defineStore } from "pinia"
import { ToastOptions, toast } from "vue3-toastify"
import 'vue3-toastify/dist/index.css';

export const useNotificationStore = defineStore("notification", () => {
    return {
        toastMessage
    }

    function toastMessage(message: string, options: ToastOptions = {
        autoClose: 3000,
        theme: "colored",
        type: "info"
    }) {
        toast(message, options);
    }

});