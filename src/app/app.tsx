import "styles/global.scss";
import { HistoricalDates } from "components/historical-dates/historical-dates";
import { Period } from "types/types";

const periods: Array<Period> = [
  {
    periodName: "Где-то",
    periodStart: 2004,
    periodEnd: 2010,
    periodDates: [
      {
        year: 2004,
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        year: 2005,
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        year: 2007,
        text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
      },
      {
        year: 2009,
        text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
      },
      {
        year: 2010,
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
    ],
  },
  {
    periodName: "Что-то",
    periodStart: 2010,
    periodEnd: 2015,
    periodDates: [
      {
        year: 2010,
        text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
      },
      {
        year: 2011,
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        year: 2012,
        text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
      },
      {
        year: 2013,
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        year: 2015,
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
    ],
  },
  {
    periodName: "Наука",
    periodStart: 2015,
    periodEnd: 2022,
    periodDates: [
      {
        year: 2015,
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        year: 2016,
        text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
      },
      {
        year: 2017,
        text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
      },
      {
        year: 2018,
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        year: 2022,
        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
    ],
  },
];

export default function App() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <div>
        <HistoricalDates periods={periods} />
        <HistoricalDates periods={periods} />
      </div>
    </>
  );
}
