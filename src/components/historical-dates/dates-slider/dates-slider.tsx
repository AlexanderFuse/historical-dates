import "./dates-slider.scss";
import { FC, useEffect, useRef, useState } from "react";
import { useHistoricalDatesContext } from "state/context";
import { PeriodDates } from "types/types";

import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import gsap from "gsap";
import { useScreenSize } from "utils/use-screen-size";
import { TABLET_SCREEN_SIZE } from "types/constants";
import { useGSAP } from "@gsap/react";

type SlideProps = PeriodDates;

const Slide: FC<SlideProps> = ({ year, text }) => {
  return (
    <div className="slide">
      <div className="slide__year">{year}</div>
      <div className="slide__text">{text}</div>
    </div>
  );
};

export const DatesSlider: FC = () => {
  const { period, periods } = useHistoricalDatesContext();
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);

  const screenSize = useScreenSize();
  const isTabletOrMobile = screenSize.width < TABLET_SCREEN_SIZE;

  useGSAP(() => {
    gsap.set(sliderRef.current, {
      opacity: 1,
      duration: 0.3,
      yPercent: 0,
    });
  }, [screenSize]);

  const sliderRef = useRef(null);
  const swiperRef = useRef(null);

  const fadeOut = gsap.fromTo(
    sliderRef.current,
    {
      paused: true,
      opacity: 1,
      duration: 0.3,
      yPercent: 0,
    },
    {
      paused: true,
      opacity: 0,
      duration: 0.3,
      yPercent: 0,
      onComplete: () => {
        fadeIn.play();
        setCurrentSliderIndex(period);
      },
    },
  );

  const fadeIn = gsap.fromTo(
    sliderRef.current,
    {
      paused: true,
      opacity: 0,
      duration: 0.3,
      yPercent: 5,
    },
    {
      paused: true,
      opacity: 1,
      duration: 0.3,
      yPercent: 0,
    },
  );

  useEffect(() => {
    isTabletOrMobile && fadeOut.play();
  }, [isTabletOrMobile]);

  useEffect(() => {
    fadeOut.play();
    setTimeout(() => swiperRef.current.swiper.slideTo(0, 0, false), 300);
  }, [period]);

  return (
    <div className="dates-slider-wrapper">
      <div className="dates-slider" ref={sliderRef}>
        <div className="dates-slider-period-name">
          {periods[currentSliderIndex].periodName}
        </div>
        <div className="dates-slider-divider"></div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={isTabletOrMobile ? "auto" : 3}
          navigation={{
            nextEl: ".button__right",
            prevEl: ".button__left",
          }}
          slidesOffsetAfter={isTabletOrMobile ? 40 : 0}
          slidesOffsetBefore={isTabletOrMobile ? 20 : 0}
          pagination={{
            enabled: isTabletOrMobile,
            el: ".swiper-pagination",
            clickable: true,
          }}
          ref={swiperRef}
        >
          {periods[currentSliderIndex].periodDates.map((date) => (
            <SwiperSlide key={date.year + date.text}>
              <Slide year={date.year} text={date.text} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="swiper-pagination"></div>
      <div className="dates-slider__button button__left">
        <div className="dates-slider__arrow dates-slider__prev"></div>
      </div>
      <div className="dates-slider__button button__right">
        <div className="dates-slider__arrow dates-slider__next"></div>
      </div>
    </div>
  );
};
