import React, { useState, useEffect } from "react";
import beepSound from "./beep-06.mp3";

import "./style.css";

export const Clock = () => {
  const [currentSeconds, setCurrentSeconds] = useState(new Date().getSeconds());
  const [currentMinutes, setCurrentMinutes] = useState(new Date().getMinutes());
  const [currentHours, setCurrentHours] = useState(new Date().getHours());

  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const [cicleLong, setCicleLong] = useState(false);

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerOn, setTimerOn] = useState(false);
  const [minutesRest, setMinutesRest] = useState(5);
  const [minutesWork, setMinutesWork] = useState(25);
  const [rest, setRest] = useState(false);

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  const playSound = () => {
    const audio = new Audio(beepSound);
    audio.play();
    return audio;
  };

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

          if (!rest) {
            setTimerMinutes(minutesRest);
            setRest(true);
            showNotification(
              "⏰ ¡Tiempo terminado!",
              "Es hora de descansar 🚀"
            );
          } else {
            setRest(false);
            setTimerMinutes(minutesWork);
            showNotification("⏰ ¡Tiempo terminado!", "Es hora de Trabajar 🚀");
          }
          playSound();
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

  const CicleChange = (isLong) => {
    const config = isLong
      ? {
          TimerMinutes: 50,
          TimerSeconds: 0,
          MinutesRest: 10,
          MinutesWork: 50,
        }
      : {
          TimerMinutes: 25,
          TimerSeconds: 0,
          MinutesRest: 5,
          MinutesWork: 25,
        };
    setCicleLong(isLong);
    setTimerMinutes(config.MinutesWork);
    setTimerSeconds(config.TimerSeconds);
    setMinutesRest(config.MinutesRest);
    setMinutesWork(config.MinutesWork);
    setTimerOn(false);
    setRest(false);
  };

  return (
    <div className="gadget-pomodoro">
      <div className="gadget clock">
        <p className="title-gadget">Reloj</p>
        <div className="clock-content">
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
        <div className="timer-content">
          <div className="buttons-cicles">
            <button
              className={!cicleLong ? "active" : ""}
              onClick={() => CicleChange(false)}
            >
              Corto
            </button>
            <button
              className={cicleLong ? "active" : ""}
              onClick={() => CicleChange(true)}
            >
              Largo
            </button>
          </div>
          <p className="timer">
            {timerMinutes?.toString().padStart(2, 0)}:
            {timerSeconds?.toString().padStart(2, 0)}
          </p>
          <div className="buttons-box">
            <button
              onClick={() =>
                setTimerMinutes((prevMinutes) => {
                  if (prevMinutes !== 0) {
                    return prevMinutes - 1;
                  } else {
                    return 0;
                  }
                })
              }
            >
              -
            </button>
            <button
              onClick={() =>
                setTimerOn((prevTimer) => {
                  return !prevTimer;
                })
              }
            >
              {"▶"}
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
