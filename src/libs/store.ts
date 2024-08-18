import { configureStore } from '@reduxjs/toolkit';

import pantipReducer from '../state/pantipSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      pantip: pantipReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
