import { createSlice } from "@reduxjs/toolkit";

export type CategoriesStateItem = {
  _id: string;
  label: string;
  grouping_1: string;
  grouping_2: string;
};

export type CategoriesState = CategoriesStateItem[];

const INITIAL_STATE: CategoriesState = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  reducers: {
    clearCategoriesState: () => INITIAL_STATE,
    setCategories: (_, action) => action.payload,
  },
});

export const { clearCategoriesState, setCategories } = categoriesSlice.actions;

export const categories = categoriesSlice.reducer;
