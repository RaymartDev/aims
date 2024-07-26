import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Company from "@/interface/company";

const initialState: Company[] = [];

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        addCompany: (state, action: PayloadAction<Company> ) => {
            return [action.payload, ...state];
        },
        updateCompany: (state, action: PayloadAction<Company>) => {
            const index = state.findIndex(company => company.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        findCompany: (state, action: PayloadAction<number>) => {
            return state.filter(company => company.id === action.payload);
        },
    }
})

export const { addCompany, updateCompany, findCompany } = companySlice.actions;
export default companySlice.reducer;