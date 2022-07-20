import React, { Fragment, useState, useEffect, useRef } from 'react'
//  import bg3 from '../../../images/slide-img-3.jpg';

function BannerCard({ event }) {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  let interval = useRef();
  const starttimer = () => {
    // const Datee = new Date(event.enddate)
    // console.log(Datee)
    const countDownDate = new Date(event.enddate).getTime()
    //  console.log(countDownDate)
    interval = setInterval(() => {
      const now = new Date().getTime()

      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // Stop Timer
        setTimerDays(0);
        setTimerHours(0)
        setTimerMinutes(0);
        setTimerSeconds(0);


        clearInterval(interval.current);
      } else {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }

    }, 1000);
  }
  useEffect(() => {
    starttimer();
    return () => {
      clearInterval();
    }
  })


  return (
    <Fragment>

      <div className="countDown" event={event}>

        <h2>
          {timerDays}
          <span>Days</span>
        </h2>
        <span className="dot">.</span>
        <h2>
          {timerHours}

          <span>Hrs</span>
        </h2>
        <span className="dot">.</span>
        <h2>
          {timerMinutes}

          <span>Mins</span>
        </h2>
        <span className="dot">.</span>
        <h2>
          {timerSeconds}

          <span>Secs</span>
        </h2>
      </div>
    </Fragment>
  )
}

export default BannerCard