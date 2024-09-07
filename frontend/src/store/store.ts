import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "@/slices/employeeSlice";
import storeReducer from "@/slices/storeSlice";
import userReducer from "@/slices/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        employee: employeeReducer,
        store: storeReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;