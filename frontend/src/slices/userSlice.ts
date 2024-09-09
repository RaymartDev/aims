/* eslint-disable @typescript-eslint/no-unused-vars */
import { removeCookie } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface UserStateRaw {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string | null;
  name: string | null;
  token: string | null;
}

interface SavedState {
  isLoggedIn: boolean;
  token: string;
}

interface DecodedToken {
  name: string | null;
  username: string | null;
  admin: boolean;
}

type UserState = Partial<UserStateRaw>;



const getDecodedToken = (token: string) => {
  return token ? jwtDecode<DecodedToken>(token) : null;
};

const getInitialState = (): UserState => {
  const serializedState = localStorage.getItem('savedState');
  if (serializedState) {
    const savedState = JSON.parse(serializedState || '') as SavedState;
    const decodeSavedToken = getDecodedToken(savedState.token);
    return { 
      isLoggedIn: savedState.isLoggedIn, 
      token: savedState.token, 
      isAdmin: decodeSavedToken?.admin,
      name: decodeSavedToken?.name,
      username: decodeSavedToken?.username,
    }
  }
  return {
    isLoggedIn: false,
    isAdmin: false,
    token: null,
    name: null,
    username: null,
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    login: (_state, action: PayloadAction<UserState>) => {
      const { isAdmin, username, name, token } = action.payload;
      localStorage.setItem('savedState', JSON.stringify({ isLoggedIn: true, isAdmin, username, name, token }));
      return { isLoggedIn: true, isAdmin, username, name, token };
    },
    logout: (_state) => {
      localStorage.removeItem('savedState');
      removeCookie('token');
      return { ...getInitialState() };
    }
  }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;