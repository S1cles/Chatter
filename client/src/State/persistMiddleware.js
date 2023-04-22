// import {configurePersist} from 'zustand-persist';
// import cloneDeep from 'lodash.clonedeep';

// export const persistMiddleware = configurePersist({
//     name: 'auth-storage', // имя хранилища
//     getStorage: () => sessionStorage, // выберите LocalStorage или SessionStorage
//     // Трансформеры необходимы для сохранения/загрузки объектов с датами, и т.д.
//     // Можно определить собственный трансформер, чтобы решить свою задачу.
//     // Список трансформеров может быть найден в документации.
//     serialize: (state) => JSON.stringify(cloneDeep(state)),
//     deserialize: (serialized) => JSON.parse(serialized),
//   });