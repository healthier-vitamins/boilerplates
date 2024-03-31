import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface AuthenticationState {
    user: string
}

const initialState: AuthenticationState = {
    user: ''
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        reset: (_state) => {
            return initialState
        },
        setUser: (state) => {
            state.user = 'hello werld'
        },
        resetUser: (state) => {
            state.user = ''
        }
    }
})

const reducerAuthentication = authenticationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuthentication = (state: RootState) => state.authentication

export default reducerAuthentication
