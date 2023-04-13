import Settings from './settings';

class Pomodoro {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  timeLeft: number;
  elapsedTime: number = 0;
  startPauseBtn = document.querySelector('.start-pause-btn') as HTMLParagraphElement;
  pomodoroBtn = document.querySelector('.pomodoro-break .pomodoro') as HTMLLIElement;
  shortBreakBtn = document.querySelector('.pomodoro-break .short-break') as HTMLLIElement;
  longBreakBtn = document.querySelector('.pomodoro-break .long-break') as HTMLLIElement;
  currentTimer = 'pomodoro';
  interval: any;

  constructor() {
    const { pomodoro, shortBreak, longBreak } = new Settings().time;

    this.pomodoro = pomodoro;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;
    this.timeLeft = pomodoro * 60;
  }

  init() {
    this.displayTime(this.formatTime(this.pomodoro * 60));

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

    this.pomodoroBtn.addEventListener('click', () => this.startPomodoro());
    this.shortBreakBtn.addEventListener('click', () => this.startShortBreak());
    this.longBreakBtn.addEventListener('click', () => this.startLongBreak());
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

    let timeToUse: number = this.pomodoro;
    if (this.currentTimer === 'pomodoro') timeToUse = this.pomodoro;
    if (this.currentTimer === 'shortBreak') timeToUse = this.shortBreak;
    if (this.currentTimer === 'longBreak') timeToUse = this.longBreak;

    const elapsedTimePercentage = ((this.elapsedTime / (timeToUse * 60)) * 100).toFixed();

    progressBar.style.strokeDasharray = `${elapsedTimePercentage} 100`;
  }

  startPomodoro() {
    if (this.currentTimer === 'pomodoro' && this.interval) {
      return;
    }
    clearInterval(this.interval);
    this.timeLeft = this.pomodoro * 60;
    this.elapsedTime = 0;
    this.currentTimer = 'pomodoro';
    this.switchBreakBtnStyle();
    this.startPauseBtn.innerText = 'pause';
    this.interval = setInterval(() => this.countdown(), 1000);
  }

  startShortBreak() {
    if (this.currentTimer === 'shortBreak' && this.interval) {
      return;
    }
    clearInterval(this.interval);
    this.timeLeft = this.shortBreak * 60;
    this.elapsedTime = 0;
    this.currentTimer = 'shortBreak';
    this.switchBreakBtnStyle();
    this.startPauseBtn.innerText = 'pause';
    this.interval = setInterval(() => this.countdown(), 1000);
  }

  startLongBreak() {
    if (this.currentTimer === 'longBreak' && this.interval) {
      return;
    }
    clearInterval(this.interval);
    this.timeLeft = this.longBreak * 60;
    this.elapsedTime = 0;
    this.currentTimer = 'longBreak';
    this.switchBreakBtnStyle();
    this.startPauseBtn.innerText = 'pause';
    this.interval = setInterval(() => this.countdown(), 1000);
  }

  switchBreakBtnStyle() {
    this.pomodoroBtn.classList.remove('active');
    this.shortBreakBtn.classList.remove('active');
    this.longBreakBtn.classList.remove('active');

    if (this.currentTimer === 'pomodoro') {
      this.pomodoroBtn.classList.add('active');
    } else if (this.currentTimer === 'shortBreak') {
      this.shortBreakBtn.classList.add('active');
    } else if (this.currentTimer === 'longBreak') {
      this.longBreakBtn.classList.add('active');
    }
  }
}

export default Pomodoro;
