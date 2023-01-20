import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import type { RootState, AppDispatch } from './store'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
