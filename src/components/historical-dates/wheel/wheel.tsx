import "./wheel.scss";
import { FC, useCallback, useEffect, useState } from "react";
import { useHistoricalDatesContext } from "state/context";
import cx from "classnames";
import { useWheelAnimation } from "components/historical-dates/wheel/use-wheel-animation";
import { PropsWithId } from "types/types";
import { counter } from "utils/counter";
interface WheelProps extends PropsWithId {}

export const Wheel: FC<WheelProps> = ({ id: wheelId }) => {
  const { periods, period, setPeriod } = useHistoricalDatesContext();

  const {
    prepareRotation,
    prepareRotationNext,
    prepareRotationPrev,
    isAnimating,
  } = useWheelAnimation(wheelId);

  const handleItemClick = useCallback(
    (i: number) => {
      if (isAnimating()) {
        return;
      }
      prepareRotation(i);
      setLastPeriod(period);
      setPeriod(i);
    },
    [period],
  );

  const currentPeriod = `${period + 1}`.padStart(2, "0");
  const totalPeriods = `${periods.length}`.padStart(2, "0");

  const handleNext = useCallback(() => {
    if (isAnimating()) {
      return;
    }
    const nextPeriod = (period + 1) % periods.length;
    prepareRotationNext();
    setLastPeriod(period);
    setPeriod(nextPeriod);
  }, [period]);

  const handlePrev = useCallback(() => {
    if (isAnimating()) {
      return;
    }
    const prevPeriod = (periods.length + period - 1) % periods.length;
    prepareRotationPrev();
    setLastPeriod(period);
    setPeriod(prevPeriod);
  }, [period]);

  const [lastPeriod, setLastPeriod] = useState(period);
  const [periodStart, setPeriodStart] = useState(periods[period].periodStart);
  const [periodEnd, setPeriodEnd] = useState(periods[period].periodEnd);

  useEffect(() => {
    counter(
      periods[lastPeriod].periodStart,
      periods[period].periodStart,
      800,
      (currentNumber) => {
        setPeriodStart(currentNumber);
      },
    );
    counter(
      periods[lastPeriod].periodEnd,
      periods[period].periodEnd,
      800,
      (currentNumber) => {
        setPeriodEnd(currentNumber);
      },
    );
  }, [period]);

  return (
    <div className="wheel-wrapper">
      <div className="wheel">
        <div className="wheel__years">
          <div className="year year__start">{periodStart}</div>
          <div className="year year__end">{periodEnd}</div>
        </div>
        <div className="wheel__wheel">
          <div className={`wrapper-${wheelId} wrapper`}>
            {periods.map((periodData, index) => {
              return (
                <div
                  className={cx(
                    "item",
                    { "item--active": period === index },
                    `item-${wheelId}`,
                  )}
                  key={index}
                  onClick={() => {
                    handleItemClick(index);
                  }}
                >
                  <div className="item__circle"></div>
                  <div className="item__period-number">{index + 1}</div>
                  <div className="item__period-name">
                    {periodData.periodName}
                  </div>
                </div>
              );
            })}
            <svg viewBox="0 0 530 530" id={`svg-${wheelId}`}>
              <circle
                id={`holder-${wheelId}`}
                className="st0"
                cx="265"
                cy="265"
                r="265"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="arrow-controls">
        <div className="arrow-controls__current-and-total">
          {currentPeriod} / {totalPeriods}
        </div>
        <div className="arrow-controls__arrows">
          <div className="arrow arrow__left" onClick={handlePrev}>
            <div className="icon left"></div>
          </div>
          <div className="arrow arrow__right" onClick={handleNext}>
            <div className="icon right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
