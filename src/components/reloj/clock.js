import React, { useState, useEffect } from "react";

import "./style.css";

export const Clock = () => {
  const [currentSeconds, setCurrentSeconds] = useState(new Date().getSeconds());
  const [currentMinutes, setCurrentMinutes] = useState(new Date().getMinutes());
  const [currentHours, setCurrentHours] = useState(new Date().getHours());

  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const [timerSeconds, setTimerSeconds] = useState(3);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerOn, setTimerOn] = useState(true);

  useEffect(() => {
    if (!timerOn) return;

    const interval = setInterval(() => {
      setTimerSeconds((prevSeconds) => {
        if (timerMinutes === 0 && prevSeconds === 0) return (prevSeconds = 0);

        if (prevSeconds > 0) return prevSeconds - 1;
        return 59;
      });

      setTimerMinutes((prevMinutes) => {
        if (timerSeconds > 0) return prevMinutes;

        if (prevMinutes === 0) {
          setTimerOn(false);
          console.log("Temporizador Termiando");
          return 0;
        }
        return prevMinutes - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerOn, timerSeconds, timerMinutes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDay(new Date().getDate());
      setCurrentMonth(new Date().getMonth());
      setCurrentSeconds(new Date().getSeconds());
      setCurrentMinutes(new Date().getMinutes());
      setCurrentHours(new Date().getHours());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gadget-pomodoro">
      <div className="gadget clock">
        <p className="title-gadget">Reloj</p>
        <div>
          <p className="date">
            {currentDay}/{currentMonth + 1}
          </p>
          <p className="time">
            {currentHours.toString().padStart(2, 0)}:
            {currentMinutes.toString().padStart(2, 0)}:
            {currentSeconds.toString().padStart(2, 0)}
          </p>
        </div>
      </div>
      <div className=" gadget pomodoro">
        <p className="title-gadget">Pomodoro</p>
        <div>
          <p className="timer">
            {timerMinutes?.toString().padStart(2, 0)}:
            {timerSeconds?.toString().padStart(2, 0)}
          </p>
          <div className="buttons-box">
            <button
              onClick={() => setTimerMinutes((prevMinutes) => prevMinutes - 1)}
            >
              -
            </button>
            <button onClick={() => setTimerOn((prevTimer) => !prevTimer)}>
              {">"}
            </button>
            <button
              onClick={() => setTimerMinutes((prevMinutes) => prevMinutes + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
