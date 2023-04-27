import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const INITIAL_FORM_STATE = {
    currentChat: null
};

const store = (set, get) => ({
    currentChat: INITIAL_FORM_STATE.currentChat,
    updateChat: (name) => set({ currentChat: name }, false, "ChatSet"),

});



export const useAuthGlobal = create(
    devtools(
        persist(store, { name: "Chat" })
    )
);

export default useAuthGlobal;