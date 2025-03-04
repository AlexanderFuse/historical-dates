import "./historical-dates.scss";
import { FC, useId } from "react";
import { Period } from "types/types";
import { PeriodProvider } from "state/context";
import { Wheel } from "components/historical-dates/wheel/wheel";
import { DatesSlider } from "components/historical-dates/dates-slider/dates-slider";

interface HistoricalDatesProps {
  periods: Array<Period>;
}

export const HistoricalDates: FC<HistoricalDatesProps> = ({ periods }) => {
  const wheelId = useId();

  return (
    <PeriodProvider periods={periods}>
      <div className="historical-dates">
        <div className="historical-dates__title">
          <div className="title__border"></div>
          <h1 className="title__text">
            Исторические <br /> даты
          </h1>
        </div>
        <Wheel id={wheelId} />
        <DatesSlider />
        <div className="historical-dates__range-slides"></div>
        <div className="hairline hairline--horizontal"></div>
        <div className="hairline hairline--vertical"></div>
      </div>
    </PeriodProvider>
  );
};
