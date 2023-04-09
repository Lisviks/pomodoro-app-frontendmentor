interface Settings {
  time: TimeSettings;
  font: number;
  color: number;
}

interface TimeSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

interface SettingsHTMLElements {
  pomodoroInput: HTMLInputElement;
  shortBreakInput: HTMLInputElement;
  longBreakInput: HTMLInputElement;
  allFontElements: NodeListOf<HTMLLIElement>;
  allColorElements: NodeListOf<HTMLLIElement>;
}

const elements = (): SettingsHTMLElements => {
  const pomodoroInput = document.querySelector('.pomodoro-input') as HTMLInputElement;
  const shortBreakInput = document.querySelector('.short-break-input') as HTMLInputElement;
  const longBreakInput = document.querySelector('.long-break-input') as HTMLInputElement;
  const allFontElements = document.querySelectorAll('.font-settings li') as NodeListOf<HTMLLIElement>;
  const allColorElements = document.querySelectorAll('.color-settings li') as NodeListOf<HTMLLIElement>;

  return {
    pomodoroInput,
    shortBreakInput,
    longBreakInput,
    allFontElements,
    allColorElements,
  };
};

const modalTimeInputsInit = (time: TimeSettings) => {
  const { pomodoroInput, shortBreakInput, longBreakInput } = elements();

  pomodoroInput.value = String(time.pomodoro);
  shortBreakInput.value = String(time.shortBreak);
  longBreakInput.value = String(time.longBreak);
};

const modalFontInit = (font: number) => {
  const allFontElements = elements().allFontElements;

  allFontElements.forEach((element, index) => {
    element.classList.remove('active');

    if (font - 1 === index) {
      element.classList.add('active');
    }
  });
};

const modalColorInit = (color: number) => {
  const allColorElements = elements().allColorElements;

  allColorElements.forEach((element, index) => {
    element.classList.remove('active');

    if (color - 1 === index) {
      element.classList.add('active');
    }
  });
};

const getSettings = (): Settings => {
  const settingsLS = localStorage.getItem('FEM-Pomodoro-Settings');
  let settings: Settings = {
    time: {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
    },
    font: 1,
    color: 1,
  };
  if (!settingsLS) {
    localStorage.setItem('FEM-Pomodoro-Settings', JSON.stringify(settings));
  } else {
    settings = JSON.parse(settingsLS);
  }

  return settings;
};

const initSettings = () => {
  const settings = getSettings();

  modalTimeInputsInit(settings.time);
  modalFontInit(settings.font);
  modalColorInit(settings.color);
  applySettings(settings);
};

const applySettings = (settings: Settings) => {
  const bodyElement = document.querySelector('body') as HTMLBodyElement;

  bodyElement.className = `font-${settings.font} color-${settings.color}`;
};

export default initSettings;
