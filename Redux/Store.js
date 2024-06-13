import { configureStore } from '@reduxjs/toolkit'
import UserAuth from './Slice/UserAuth'
import { mainApi } from './Api/main'
import Chat from './Slice/Chat'


export const store = configureStore({
  reducer: {
    userauth:UserAuth,
    chat:Chat,
    [mainApi.reducerPath]:mainApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
})