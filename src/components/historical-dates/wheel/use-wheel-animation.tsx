import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { useHistoricalDatesContext } from "state/context";
import { useRef, useState } from "react";
import { useScreenSize } from "utils/use-screen-size";

export const useWheelAnimation = (wheelId: string) => {
  gsap.registerPlugin(MotionPathPlugin, useGSAP);
  const screenSize = useScreenSize();
  const { period } = useHistoricalDatesContext();

  const [rotationAmount, setRotationAmount] = useState(0);
  const { contextSafe } = useGSAP();

  const tl = useRef(null);
  const numItems = useRef(null);
  const itemStep = useRef(null);
  const wrapProgress = useRef(null);
  const snap = useRef(null);
  const wrapTracker = useRef(null);
  const tracker = useRef(null);
  const circle = useRef(null);
  const items = useRef([]);

  useGSAP(() => {
    circle.current = MotionPathPlugin.convertToPath(
      `#holder-${CSS.escape(wheelId)}`,
      false,
    )[0];
    circle.current.id = `circlePath-${wheelId}`;
    document.getElementById(`svg-${wheelId}`).prepend(circle.current);
  });

  useGSAP(() => {
    items.current = gsap.utils.toArray(`.item-${CSS.escape(wheelId)}`);

    numItems.current = items.current.length;
    itemStep.current = 1 / numItems.current;
    wrapProgress.current = gsap.utils.wrap(0, 1);
    snap.current = gsap.utils.snap(itemStep.current);
    wrapTracker.current = gsap.utils.wrap(0, numItems.current);
    tracker.current = { item: period };

    gsap.set(items.current, {
      motionPath: {
        path: circle.current,
        align: circle.current,
        alignOrigin: [0.5, 0.5],
        end: (i) => i / items.current.length - 0.1,
      },
    });

    tl.current = gsap.timeline({ paused: true, reversed: true });

    tl.current.to(`.wrapper-${CSS.escape(wheelId)}`, {
      rotation: 360,
      transformOrigin: "center",
      duration: 1,
      ease: "none",
    });

    tl.current.to(
      items.current,
      {
        rotation: -360,
        transformOrigin: "center center",
        duration: 1,
        ease: "none",
      },
      0,
    );

    tl.current.to(
      tracker.current,
      {
        item: numItems.current,
        duration: 1,
        ease: "none",
        modifiers: {
          item: (value: any) => {
            return wrapTracker.current(numItems.current - Math.round(value));
          },
        },
      },
      0,
    );
  }, [screenSize]);

  useGSAP(() => {
    moveWheel(rotationAmount);
  }, [period]);

  const moveWheel = contextSafe((amount: number) => {
    let progress = tl.current.progress();
    tl.current.progress(
      wrapProgress.current(snap.current(tl.current.progress() + amount)),
    );
    tl.current.progress(progress);

    gsap.to(tl.current, {
      progress: snap.current(tl.current.progress() + amount),
      modifiers: {
        progress: wrapProgress.current,
      },
      ease: "power1.inOut",
      duration: 0.8,
    });
  });

  const prepareRotation = (i: number) => {
    const current = tracker.current.item;

    if (i === current) {
      return;
    }

    const diff = current - i;

    if (Math.abs(diff) < numItems.current / 2) {
      setRotationAmount(diff * itemStep.current);
    } else {
      const amt = numItems.current - Math.abs(diff);
      if (current > i) {
        setRotationAmount(amt * -itemStep.current);
      } else {
        setRotationAmount(amt * itemStep.current);
      }
    }
  };

  const prepareRotationNext = () => {
    setRotationAmount(-itemStep.current);
  };

  const prepareRotationPrev = () => {
    setRotationAmount(itemStep.current);
  };

  const isAnimating = () => gsap.isTweening(tl.current);

  return {
    prepareRotation,
    prepareRotationNext,
    prepareRotationPrev,
    isAnimating,
  };
};
