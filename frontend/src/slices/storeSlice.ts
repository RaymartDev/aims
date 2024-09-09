import Store from "@/interface/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Store[] = [];

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addStore: ( state, action: PayloadAction<Store> ) => {
            return [action.payload, ...state];
        },
        updateStore: ( state, action: PayloadAction<Store> ) => {
            const index = state.findIndex(store => store.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    }
})

export const { addStore, updateStore } = storeSlice.actions;
export default storeSlice.reducer;