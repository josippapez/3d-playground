'use client';

import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';
import { useCallback, useState } from 'react';

type Props = {
  text: string;
  style?: 'word-by-word' | 'letter-by-letter';
  delay?: number;
  duration?: number;
  wrap?: boolean;
};

let sectionsAnimating = 1;

export const AnimateSentence: React.FC<Props> = ({
  text,
  delay = 0,
  duration = 0.05,
  style,
  wrap = true,
}) => {
  const [delayCounter, setDelayCounter] = useState(delay);
  const [inView, setInView] = useState(false);
  const animation: Variants = {
    initial: {
      y: '25%',
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: '-25%',
      opacity: 0,
    },
  };

  const textToAnimate =
    style === 'word-by-word' ? text.split(' ') : text.split('');

  const onViewPortEnter = useCallback(
    (entry: IntersectionObserverEntry | null) => {
      const delayAndDuration = delay + duration;
      const durationWithBuffer = delayAndDuration * 1500;
      setInView(true);
      if (sectionsAnimating < 0 && entry?.time) {
        if (entry.time !== durationWithBuffer) {
          const normalizedDelay = delayAndDuration / 10;
          setDelayCounter(normalizedDelay);
        }
      }

      sectionsAnimating++;
    },
    [delay, duration],
  );

  return (
    <div
      className={clsx(
        'flex clip word whitespace-break-spaces',
        wrap && 'flex-wrap',
      )}
    >
      {textToAnimate.map((letter, index) => (
        <motion.span
          className="flex"
          onViewportEnter={onViewPortEnter}
          onAnimationComplete={() => {
            sectionsAnimating--;
          }}
          key={`${letter}-${index}`}
          variants={animation}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          transition={{ delay: delayCounter + index * duration }}
        >
          {letter}
          {style === 'word-by-word' && <div>&#32;</div>}
        </motion.span>
      ))}
    </div>
  );
};
