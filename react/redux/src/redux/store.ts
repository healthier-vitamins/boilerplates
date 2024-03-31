import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { authenticationSlice } from './reducers/authentication'

const store = configureStore({
    reducer: {
        authentication: authenticationSlice.reducer
    }
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
