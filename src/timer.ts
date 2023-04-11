import Settings from './settings';

const timeSettings = new Settings().time;

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;

  return `${minutes}:${seconds}`;
};

const displayTime = (time: string) => {
  const timerElement = document.querySelector('.pomodoro-timer .timer') as HTMLHeadingElement;

  timerElement.innerText = time;
};

const timer = () => {
  const { pomodoro, shortBreak, longBreak } = timeSettings;

  let ellapsedTime = 0;
  let timeLeft = pomodoro * 60;

  let countdown: any;

  const startPauseBtn = document.querySelector('.start-pause-btn') as HTMLParagraphElement;

  startPauseBtn.addEventListener('click', () => {
    let countdownState = startPauseBtn.innerText.toLowerCase();

    if (countdownState === 'start') {
      startPauseBtn.innerText = 'pause';
      countdown = setInterval(() => {
        timeLeft--;
        ellapsedTime++;
        const formattedTime = formatTime(timeLeft);
        displayTime(formattedTime);

        if (timeLeft === 0) {
          clearInterval(countdown);
        }
      }, 1000);
    } else if (countdownState === 'pause') {
      clearInterval(countdown);
      startPauseBtn.innerText = 'start';
    } else if (countdownState === 'restart') {
      // restart pomodor
    }
  });
};

export default timer;
