import Settings from './settings';

class Pomodoro {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  timeLeft: number;
  elapsedTime: number = 0;
  startPauseBtn = document.querySelector('.start-pause-btn') as HTMLParagraphElement;
  interval: any;

  constructor() {
    const { pomodoro, shortBreak, longBreak } = new Settings().time;

    this.pomodoro = pomodoro;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;
    this.timeLeft = pomodoro * 60;
  }

  init() {
    this.startPauseBtn.addEventListener('click', () => {
      let countdownState = this.startPauseBtn.innerText.toLowerCase();

      if (countdownState === 'start') {
        this.startTimer();
      } else if (countdownState === 'pause') {
        this.pauseTimer();
      } else if (countdownState === 'restart') {
        this.restartTimer();
      }
    });
  }

  formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;

    return `${minutes}:${seconds}`;
  };

  displayTime = (time: string) => {
    const timerElement = document.querySelector('.pomodoro-timer .timer') as HTMLHeadingElement;

    timerElement.innerText = time;
  };

  startTimer() {
    this.startPauseBtn.innerText = 'pause';
    this.interval = setInterval(() => this.countdown(), 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.startPauseBtn.innerText = 'start';
  }

  restartTimer() {
    this.timeLeft = new Settings().getTime().pomodoro * 60;
    this.startPauseBtn.innerText = 'pause';
    this.interval = setInterval(() => this.countdown(), 1000);
  }

  countdown() {
    this.timeLeft--;
    this.elapsedTime++;
    const formattedTime = this.formatTime(this.timeLeft);
    this.displayTime(formattedTime);
    this.progressBar();

    if (this.timeLeft === 0) {
      clearInterval(this.interval);
      this.startPauseBtn.innerText = 'restart';
    }
  }

  progressBar() {
    type SvgInHtml = HTMLElement & SVGAElement;
    const progressBar = document.querySelector('.circular-chart') as SvgInHtml;

    const elapsedTimePercentage = ((this.elapsedTime / (this.pomodoro * 60)) * 100).toFixed();

    progressBar.style.strokeDasharray = `${elapsedTimePercentage} 100`;
  }
}

export default Pomodoro;
