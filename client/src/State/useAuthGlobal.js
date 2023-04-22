// import { create } from 'zustand';
// import { persistMiddleware } from './persistMiddleware';

// const useAuthGlobal = create((set) => ({
//   isAuth: false,
//   token: null,
//   updateIsAuth: (auth) => set(() => ({ isAuth: auth })),
//   updateToken: (newToken) => set(() => ({ token: newToken })),
// }), persistMiddleware);

// export default useAuthGlobal;
import { create } from 'zustand';
import {configurePersist} from 'zustand-persist';
import cloneDeep from 'lodash.clonedeep';

const persistMiddleware = configurePersist({
  name: 'auth-storage', // имя ключа
  getStorage: () => sessionStorage,
  serialize: (state) => JSON.stringify(cloneDeep(state)),
  deserialize: (serialized) => JSON.parse(serialized),
});

const useAuthGlobal = create((set) => ({
  isAuth: false,
  token: null,
  updateIsAuth: (auth) => set(() => ({ isAuth: auth })),
  updateToken: (newToken) => set(() => ({ token: newToken })),
}), persistMiddleware);

export default useAuthGlobal;