import './sass/main.scss';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(`${selector}`),
    this.targetDate = targetDate,
    this.days = document.querySelector(`${selector} [data-value=days]`),
    this.hours = document.querySelector(`${selector} [data-value=hours]`),
    this.mins = document.querySelector(`${selector} [data-value=mins]`),
    this.secs = document.querySelector(`${selector} [data-value=secs]`),

    this.countDown();
  }

  makeString(value) {
    return String(value).padStart(2, '0');
  }
  
  countDown() {
    setInterval(() => {
      const currentTime = new Date();
      const timerTime = this.targetDate - currentTime;
      const time = this.getTimeComponents(timerTime);
      this.updateTimer(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.makeString(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.makeString(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.makeString(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.makeString(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
  
  updateTimer({ days, hours, mins, secs }) {
    this.days.textContent = days;
    this.hours.textContent = hours;
    this.mins.textContent = mins;
    this.secs.textContent = secs;
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(2022, 0, 1, 0, 0, 0),
});
