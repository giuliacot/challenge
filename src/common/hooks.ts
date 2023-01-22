import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import type { RootState } from '../store'

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
