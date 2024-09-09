import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Supplier from "@/interface/supplier";

const initialState: Supplier[] = [];

const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {
        addSupplier: (state, action: PayloadAction<Supplier> ) => {
            return [action.payload, ...state];
        },
        updateSupplier: (state, action: PayloadAction<Supplier>) => {
            const index = state.findIndex(supplier => supplier.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    }
})

export const { addSupplier, updateSupplier } = supplierSlice.actions;
export default supplierSlice.reducer;