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
    }
})

export const { addEmployee, updateEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;