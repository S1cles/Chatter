
import { create } from 'zustand';



const useAuthGlobal = create((set) => ({
  isAuth: false,
  token: null,
  updateIsAuth: (auth) => set(() => ({ isAuth: auth })),
  updateToken: (newToken) => set(() => ({ token: newToken })),
}));

export default useAuthGlobal;