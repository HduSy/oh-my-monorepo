import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer, // 告诉store使用counterReducer来处理counter的所有更新
  },
})
// 从store本身推断类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
