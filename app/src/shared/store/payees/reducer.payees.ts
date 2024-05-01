import { createSlice } from "@reduxjs/toolkit";

export type PayeeStateItem = {
  _id: string;
  label: string;
  grouping_1: string;
};

export type PayeesState = PayeeStateItem[];

const INITIAL_STATE: PayeesState = [];

const payeesSlice = createSlice({
  name: "payees",
  initialState: INITIAL_STATE,
  reducers: {
    clearPayeesState: () => INITIAL_STATE,
    setPayees: (_, action) => action.payload,
    addPayee: (state, action) => [...state, action.payload],
  },
});

export const { clearPayeesState, setPayees, addPayee } = payeesSlice.actions;

export const payees = payeesSlice.reducer;
