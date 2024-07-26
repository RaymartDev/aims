import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Department from "@/interface/department";

const initialState: Department[] = [];

const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        addDepartment: (state, action: PayloadAction<Department> ) => {
            return [action.payload, ...state];
        },
        updateDepartment: (state, action: PayloadAction<Department>) => {
            const index = state.findIndex(department => department.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        findDepartment: (state, action: PayloadAction<number>) => {
            return state.filter(department => department.id === action.payload);
        },
    }
})

export const { addDepartment, updateDepartment, findDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;