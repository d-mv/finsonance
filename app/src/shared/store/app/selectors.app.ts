import { createSelector } from "@reduxjs/toolkit";
import type { State } from "../types.store";

export const getIsAppLoading = (state: State) => state.app.isLoading;

export const getExchangeRates = (state: State) => state.app.exchangeRates;

const getIsLoading = (state: State) => state.app.isLoading;

export const getIsAppLoadingById = createSelector(getIsLoading, isLoading => (id: string) => Boolean(isLoading[id]));

export const getIsAnythingLoading = createSelector(getIsLoading, isLoading => Object.values(isLoading).some(Boolean));
