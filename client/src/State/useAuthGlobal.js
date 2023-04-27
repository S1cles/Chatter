import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const INITIAL_FORM_STATE = {
  isAuth: false,
  token: null,
  name: null
};

const store = (set, get) => ({
  isAuth: INITIAL_FORM_STATE.isAuth,
  token: INITIAL_FORM_STATE.token,
  name: INITIAL_FORM_STATE.name,
  updateName: (name) => set({ name: name }, false, "NameSet"),
  updateIsAuth: (auth) => set({ isAuth: auth }, false, "IsAuthSet"),
  updateToken: (newToken) => set({ token: newToken }, false, "TokenSet"),
});



export const useAuthGlobal = create(

    persist(store, { name: "my-zustand-app" })

);

export default useAuthGlobal;