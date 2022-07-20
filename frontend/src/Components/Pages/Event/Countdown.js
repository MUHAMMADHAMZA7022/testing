import React, { useState, Fragment } from "react";

const Clock = () => {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  let interval;

    const countDownDate = new Date("25 June,2022")
    console.log(countDownDate)
 interval=setInterval(()=>{
    const now = new Date().getTime();

    const distance =  countDownDate-now;

    const days = Math.floor(distance / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
    const seconds = Math.floor((distance % (60 * 1000)) / 1000);
console.log(days)
if (distance < 0) {
    // Stop Timer

    clearInterval(interval.current);
  } else {
    // Update Timer
    setTimerDays(days);
    setTimerHours( hours);
    setTimerMinutes(minutes);
    setTimerSeconds( seconds);
  }
 },1000);
 


  return (
    <Fragment>
      <section className="timer-container">
        <section className="timer">
          <div className="clock">
            <section>
              <p>{timerDays}</p>
              <small>Days</small>
            </section>
            <span>:</span>
            <section>
              <p>{timerHours}</p>
              <small>Hours</small>
            </section>{" "}
            <span>:</span>
            <section>
              <p>{timerMinutes}</p>
              <small>Minutes</small>
            </section>{" "}
            <span>:</span>
            <section>
              <p>{timerSeconds}</p>
              <small>Seconds</small>
            </section>
          </div>
        </section>
      </section>
    </Fragment>
  );
};

export default Clock;
