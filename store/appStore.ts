import {Module, VuexModule, Mutation, Action} from "vuex-module-decorators";
import {IIndexable} from "@/utils/IIndexable";

@Module({
    name: "appStore",
    stateFactory: true,
    namespaced: true
})
export default class appStore extends VuexModule {
    isMobile: Boolean = false;
    snackbar: {
        show?: Boolean;
        color?: string;
        message?: string;
        timeout?: number;
    } | null = null;

    confirmationModal: {
        show?: Boolean;
        title?: string;
        text?: string;
        agreeButton?: {
            title?: string;
            color?: string;
            callback?: (_?: any) => any;
            callbackPayload?: any;
        };
        disagreeButton?: {
            title?: string;
            color?: string;
            callback?: (_?: any) => any;
            callbackPayload?: any;
        };
    } | null = null;

    @Mutation
    set(payload: { key: string; value: any }) {
        (this as IIndexable)[payload.key] = payload.value;
    }

    @Mutation
    showSnackBar(payload: {
        message: string;
        color?: "success" | "info" | "warning" | "error";
        timeout?: number;
    }) {
        this.snackbar = {
            show: true,
            message: payload.message,
            color: payload.color || "info",
            timeout: payload.timeout || 2000
        };
    }

    @Mutation
    hideSnackBar() {
        this.snackbar = {
            show: false
        };
    }

    @Mutation
    showConfirmationModal(payload: {
        title: string;
        text?: string;
        agreeButton?: {
            title?: string;
            color?: string;
            callback?: (_?: any) => any;
            callbackPayload?: any;
        };
        disagreeButton?: {
            title?: string;
            color?: string;
            callback?: (_?: any) => any;
            callbackPayload?: any;
        };
    }) {
        this.confirmationModal = {
            show: true,
            title: payload.title,
            text: payload.text || "",
            agreeButton: {
                title: payload.agreeButton?.title || "Yes",
                color: payload.agreeButton?.color || "secondary",
                callback: payload.agreeButton?.callback || function () {
                },
                callbackPayload: payload.agreeButton?.callbackPayload
            },
            disagreeButton: {
                title: payload.disagreeButton?.title || "No",
                color: payload.disagreeButton?.color || "primary",
                callback: payload.disagreeButton?.callback || function () {
                },
                callbackPayload: payload.disagreeButton?.callbackPayload
            }
        };
    }

    @Mutation
    hideConfirmationModal() {
        this.confirmationModal = {
            show: false
        };
    }

    @Action({commit: "showConfirmationModal"})
    showDeleteConfirmationModal(payload: {
        deleteItemTitle: string;
        deleteItem: Object;
        title?: string;
        agreeButton: {
            title?: string;
            color?: string;
            callback: (_?: any) => any;
        };
        disagreeButton?: {
            title?: string;
            color?: string;
            callback?: (_?: any) => any;
            callbackPayload?: any;
        };
    }) {
        return {
            title: payload.title || "Are you sure?",
            text:
                "Are you sure that you want to permanently delete " +
                payload.deleteItemTitle +
                "?",
            agreeButton: {
                title: payload.agreeButton?.title || "Yes",
                color: payload.agreeButton?.color || "error",
                callback: payload.agreeButton?.callback,
                callbackPayload: payload.deleteItem
            },
            disagreeButton: {
                title: payload.disagreeButton?.title || "No",
                color: payload.disagreeButton?.color || "primary",
                callback: payload.disagreeButton?.callback || function () {
                },
                callbackPayload: payload.disagreeButton?.callbackPayload
            }
        };
    }
}
