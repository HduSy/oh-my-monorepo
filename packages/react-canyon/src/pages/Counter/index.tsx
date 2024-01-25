import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { decrement, increment } from '../../store/slices/counterSlice'

const Counter = () => {
  const count = useAppSelector(state => state.counter.value) // 读取state数据
  const dispatch = useAppDispatch() // dispatch actions

  return (
    <>
      <div>
        <div>
          <button aria-label='Increment value' onClick={() => dispatch(increment())}>
            Increment
          </button>
          <span>{count}</span>
          <button aria-label='Decrement value' onClick={() => dispatch(decrement())}>
            Decrement
          </button>
        </div>
      </div>
    </>
  )
}

export default Counter
