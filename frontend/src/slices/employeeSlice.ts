import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Employee from "@/interface/employee";

const initialState: Employee[] = [];

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<Employee> ) => {
            return [action.payload, ...state];
        },
        updateEmployee: (state, action: PayloadAction<Employee>) => {
            const index = state.findIndex(employee => employee.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        findEmployee: (state, action: PayloadAction<number>) => {
            return state.filter(employee => employee.id === action.payload);
        },
    }
})

export const { addEmployee, updateEmployee, findEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;