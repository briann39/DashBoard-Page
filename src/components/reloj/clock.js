import React, { useState, useEffect } from "react";
import beepSound from "./beep-06.mp3";

import "./style.css";

export const Clock = () => {
  // Estados de fecha/hora actual
  const [currentSeconds, setCurrentSeconds] = useState(new Date().getSeconds());
  const [currentMinutes, setCurrentMinutes] = useState(new Date().getMinutes());
  const [currentHours, setCurrentHours] = useState(new Date().getHours());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  // Estados para el temporizador
  const [cicleLong, setCicleLong] = useState(false); // Ciclo corto/largo
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerOn, setTimerOn] = useState(false); // Estado de marcha del temporizador
  const [minutesRest, setMinutesRest] = useState(5); // Minutos de descanso
  const [minutesWork, setMinutesWork] = useState(25); // Minutos de trabajo
  const [rest, setRest] = useState(false); // true = Descansando | false = Trabajando

  // Muestra una notificación del sistema cuando termina un ciclo
  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  // Emitir sonido al finalizar el tiempo
  const playSound = () => {
    const audio = new Audio(beepSound);
    audio.play();
    return audio;
  };

  // Effect para manejar el temporizador
  useEffect(() => {
    if (!timerOn) return; // Si no esta activo no hace nada

    const interval = setInterval(() => {
      // Control de segundos
      setTimerSeconds((prevSeconds) => {
        if (timerMinutes === 0 && prevSeconds === 0) return (prevSeconds = 0); // Si ya termino todo dejar en 0

        if (prevSeconds > 0) return prevSeconds - 1; // Si todavia no termino -1 segundo
        return 59; // Reinica a 59
      });

      // Control de minutos
      setTimerMinutes((prevMinutes) => {
        if (timerSeconds > 0) return prevMinutes; // Si todavia quedan segundos no restar minutos

        // Si los minutos llegan a 0
        if (prevMinutes === 0) {
          setTimerOn(false); // Apagar el temporizador

          if (!rest) {
            //Si es descanso...
            setTimerMinutes(minutesRest); // Colocar los minutos de descanso
            setRest(true); // Activar descanso

            // Enviar notificacion de tiempo terminado
            showNotification(
              "⏰ ¡Tiempo terminado!",
              "Es hora de descansar 🚀"
            );
          } else {
            // Si es trabajo
            setRest(false); // Desactivar descanso
            setTimerMinutes(minutesWork); // Colocar los minutos de trabajo
            showNotification("⏰ ¡Tiempo terminado!", "Es hora de Trabajar 🚀"); // Enivar notificacion de tiempo terminado
          }
          playSound(); // Emitir sonido
          console.log("Temporizador Termiando"); // ------------- LOG ------------ //
          return 0; // Colocar minutos en 0
        }
        return prevMinutes - 1; // Si quedan minutos y segundos llegan a 0, restar un minuto
      });
    }, 1000);

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, [timerOn, timerSeconds, timerMinutes]);

  // Effect para actualizar la hora en tiempo real
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

  // Cambiar ciclo entre ciclo corto (25/5) | ciclo largo (50/10)
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
    setTimerOn(false); // Apagar Timer
    setRest(false); // Comenzar siempre en trabajo
  };

  return (
    <div className="gadget-pomodoro">
      {/* 📌 Reloj en tiempo real */}
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

      {/* 📌 Temporizador Pomodoro */}
      <div className="gadget pomodoro">
        <p className="title-gadget">Pomodoro</p>
        <div className="timer-content">
          {/* Botones para cambiar ciclo corto/largo */}
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

          {/* Tiempo actual del temporizador */}
          <p className="timer">
            {timerMinutes?.toString().padStart(2, 0)}:
            {timerSeconds?.toString().padStart(2, 0)}
          </p>

          {/* Botones de control del temporizador */}
          <div className="buttons-box">
            {/* Restar minutos */}
            <button
              onClick={() =>
                setTimerMinutes((prevMinutes) =>
                  prevMinutes !== 0 ? prevMinutes - 1 : 0
                )
              }
            >
              -
            </button>

            {/* Iniciar / Pausar */}
            <button onClick={() => setTimerOn((prevTimer) => !prevTimer)}>
              {"▶"}
            </button>

            {/* Sumar minutos */}
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
