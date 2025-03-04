import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Period } from "types/types";

type Periods = { periods: Array<Period> };

export const useCreateHistoricalDatesContext = function ({ periods }: Periods) {
  const [period, setPeriod] = useState(0);

  return {
    periods,
    period,
    setPeriod,
  };
};

const PeriodContext = createContext<{
  periods: Array<Period>;
  period: number;
  setPeriod: (_value: number) => void;
} | null>(null);

interface PeriodProviderProps extends PropsWithChildren, Periods {}

export const PeriodProvider = ({ children, periods }: PeriodProviderProps) => {
  const context = useCreateHistoricalDatesContext({ periods });
  return (
    <PeriodContext.Provider value={context}>{children}</PeriodContext.Provider>
  );
};

export function useHistoricalDatesContext() {
  const context = useContext(PeriodContext);
  if (!context) throw new Error("Use app context within provider!");
  return context;
}
