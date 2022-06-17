import { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateNow: new Date(),
      workdayEnd: new Date().setHours(18,0,0),
      timeLeft: '0ч 00мин'
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        this.tick();
      },
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      dateNow: new Date(),
      timeLeft: getWorkTime(this.state.dateNow, this.state.workdayEnd),
    });
  }



  render () {
    return (
      <>
        <div className="current-date">
          <div className="time" id="date">{this.state.dateNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="day" id="time">{this.state.dateNow.toLocaleDateString(undefined, { dateStyle: 'short' })}</div>
        </div>
        <div className="time-left">
            <div className="time">
                <span id="endtime">{ this.state.timeLeft }</span>
            </div>
            <p>До конца дня осталось</p>
        </div>
      </>
    )
  }
}

function getWorkTime(currentTime, endWorkTime) {

  if (endWorkTime - currentTime <= 0) return '0ч 0мин';

  const { hours, minutes } = secondsToTime(endWorkTime - currentTime);

  if (hours > 0) {
    return `${hours}ч ${minutes}мин`;
  }

  return `${minutes}мин`;
}

function secondsToTime(inputMiliSeconds) {
  const miliSecondsInASecond = 1000;
  const secondsInAMinute = 60 * miliSecondsInASecond;
  const secondsInAnHour = 60 * secondsInAMinute;
  const secondsInADay = 24 * secondsInAnHour;
  // Extract hours
  const hourSeconds = inputMiliSeconds % secondsInADay;
  const hours = Math.floor(hourSeconds / secondsInAnHour);
  // Extract minutes
  const minuteSeconds = hourSeconds % secondsInAnHour;
  const minutes = Math.ceil(minuteSeconds / secondsInAMinute);

  // Format and return
  return {
    hours,
    minutes,
  };
}

export default Clock;