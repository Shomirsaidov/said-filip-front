import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    role: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    role: typeof window !== "undefined" ? localStorage.getItem("role") : null,
    isLoggedIn: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string; role: string }>) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isLoggedIn = true;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("role", action.payload.role);
        },
        logout: (state) => {
            state.token = null;
            state.role = null;
            state.isLoggedIn = false;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
