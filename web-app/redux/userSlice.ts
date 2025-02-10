import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    token: string | null;
    userInfo: {
        id: string,
        email: string
    } | null
}

const initialState:UserState = {
    token: null,
    userInfo: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{token:string, userInfo:{id:string, email:string}}>) => {
            state.token = action.payload.token;
            state.userInfo = action.payload.userInfo;
        }
    }
})

export const {login} = userSlice.actions
export default userSlice.reducer