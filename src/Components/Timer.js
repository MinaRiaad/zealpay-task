import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = ({ difficulty, handleSubmitAnswer }) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (difficulty === "hard") setDuration(30);
    else if (difficulty === "medium") setDuration(60);
    else if (difficulty === "easy") setDuration(90);
  }, [difficulty]);

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        size={125}
        duration={duration}
        strokeWidth={63}
        colors={["#858484"]}
        strokeLinecap="butt"
        rotation="counterclockwise"
        initialRemainingTime={0}
        onComplete={() => {
          handleSubmitAnswer();
          return { shouldRepeat: true, delay: 0 };
        }}
      >
        <div />
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
