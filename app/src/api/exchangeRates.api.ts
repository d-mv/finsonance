import { Action, Context, ExchangeRatesState, setExchangeRates, setIsLoadingById } from "@shared/store";
import dayjs from "dayjs";

export function getExchangeRates(ctx: Context) {
  return async function call(_action: Action) {
    const {
      store,
      services: { LoggerService, ExchangeRatesService, LocalStorageService },
    } = ctx;

    store.dispatch(setIsLoadingById(["exchangeRates", true]));

    const logger = new LoggerService();

    logger.addContext({ area: "ExchangeRatesService", method: "getLatest" });

    const exchangeRatesFromStorage = LocalStorageService.get<ExchangeRatesState>("exchangeRates", { _updatedAt: 0 });

    let isActual = false;

    let exchangeRates: ExchangeRatesState = { _updatedAt: 0 };

    if (exchangeRatesFromStorage.isOk()) {
      exchangeRates = exchangeRatesFromStorage.unwrap();

      if (exchangeRates._updatedAt && dayjs().diff(exchangeRates["_updated_at"], "hours") < 24) isActual = true;
    }

    if (!isActual) {
      logger.dispatch({ message: "Exchange rates are outdated, requesting..." });

      const result = await ExchangeRatesService.getLatest(ctx);

      if (result.isOk()) {
        const data = result.unwrap();

        exchangeRates = { ...data.rates, _updatedAt: data.timestamp * 1_000 };
        LocalStorageService.save("exchangeRates", exchangeRates);
      } else {
        console.error(">>>", result.unwrapErr());
      }
    } else {
      logger.dispatch({ message: "Exchange rates are actual" });
    }

    store.dispatch(setExchangeRates(exchangeRates));
    store.dispatch(setIsLoadingById(["exchangeRates", false]));
  };
}
