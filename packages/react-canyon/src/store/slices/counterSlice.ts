import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

// 定义slice state的类型
interface CounterState {
  value: number
}
// 使用该类型定义初始state
const initialState: CounterState = {
  value: 0,
}
/**
 * Redux不允许直接操作state的更新，必须创建一个副本在副本上进行更新
 * Redux Toolkit's createSlice内部使用Immer允许我们【更容易地】做到上述要求
 */
const counterSlice = createSlice({
  // 标识slice
  name: 'counter',
  // 初始state
  initialState,
  // 更新state的函数
  reducers: {
    // Redux Toolkit 允许我们在 reducers 中编写 mutating 逻辑。
    // 它实际上并没有 mutate state 因为它使用了 Immer 库，
    // 它检测到草稿 state 的变化并产生一个全新的基于这些更改的不可变 state
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})
// 导出生成的Redux action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions
// selectors 等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.counter.value
// 导出整个slice reducer函数
export default counterSlice.reducer
