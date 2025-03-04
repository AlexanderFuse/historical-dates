export interface PeriodDates {
  year: number;
  text: string;
}

export interface Period {
  periodName: string;
  periodStart: number;
  periodEnd: number;
  periodDates: Array<PeriodDates>;
}

export type PropsWithId = { id: string };
