interface TimeSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoBreak: boolean;
}

interface SettingsHTMLElements {
  pomodoroInput: HTMLInputElement;
  shortBreakInput: HTMLInputElement;
  longBreakInput: HTMLInputElement;
  autoBreakInput: HTMLInputElement;
  allFontElements: NodeListOf<HTMLLIElement>;
  allColorElements: NodeListOf<HTMLLIElement>;
  applyButton: HTMLButtonElement;
}

class Settings {
  time: TimeSettings = { pomodoro: 25, shortBreak: 5, longBreak: 15, autoBreak: false };
  font: number = 1;
  color: number = 1;

  constructor() {
    const settingsLS = localStorage.getItem('FEM-Pomodoro-Settings');
    if (settingsLS) {
      const settings = JSON.parse(settingsLS);
      this.time = settings.time;
      this.font = settings.font;
      this.color = settings.color;
      this.applySettings();
    } else {
      this.saveSettingsToLS();
    }
  }

  init() {
    elements().applyButton.addEventListener('click', () => {
      this.saveSettingsToLS();
      this.applySettings();
    });

    this.modalTimeInputsInit();
    this.modalFontInit();
    this.modalColorInit();
  }

  private saveSettingsToLS() {
    const settings = {
      time: this.time,
      font: this.font,
      color: this.color,
    };

    localStorage.setItem('FEM-Pomodoro-Settings', JSON.stringify(settings));
  }

  getTime() {
    return this.time;
  }

  private modalTimeInputsInit = () => {
    const { pomodoroInput, shortBreakInput, longBreakInput } = elements();

    pomodoroInput.value = String(this.time.pomodoro);
    shortBreakInput.value = String(this.time.shortBreak);
    longBreakInput.value = String(this.time.longBreak);

    this.initTimeInputEventListeners();
  };

  private modalFontInit = () => {
    const allFontElements = elements().allFontElements;

    allFontElements.forEach((element, index) => {
      element.classList.remove('active');

      if (this.font - 1 === index) {
        element.classList.add('active');
      }
      this.initFontEventListeners(element);
    });
  };

  private modalColorInit = () => {
    const allColorElements = elements().allColorElements;

    allColorElements.forEach((element, index) => {
      element.classList.remove('active');

      if (this.color - 1 === index) {
        element.classList.add('active');
      }

      this.initColorEventListeners(element);
    });
  };

  private initFontEventListeners(element: HTMLLIElement) {
    const fontElements = elements().allFontElements;

    element.addEventListener('click', () => {
      fontElements.forEach((el) => el.classList.remove('active'));
      element.classList.add('active');

      const fontNumber = element.className.split(/[-\s]/)[1];
      this.font = +fontNumber;
    });
  }

  private initColorEventListeners(element: HTMLLIElement) {
    const colorElements = elements().allColorElements;

    element.addEventListener('click', () => {
      colorElements.forEach((el) => el.classList.remove('active'));
      element.classList.add('active');

      const colorNumber = element.className.split(/[-\s]/)[1];
      this.color = +colorNumber;
    });
  }

  private initTimeInputEventListeners() {
    const pomodoro = elements().pomodoroInput;
    const shortBreak = elements().shortBreakInput;
    const longBreak = elements().longBreakInput;
    const autoBreakInput = elements().autoBreakInput;

    autoBreakInput.checked = this.time.autoBreak;

    pomodoro.addEventListener('change', () => (this.time.pomodoro = +pomodoro.value));
    shortBreak.addEventListener('change', () => (this.time.shortBreak = +shortBreak.value));
    longBreak.addEventListener('change', () => (this.time.longBreak = +longBreak.value));
    autoBreakInput.addEventListener('change', () => (this.time.autoBreak = !this.time.autoBreak));
  }

  private applySettings() {
    const bodyElement = document.querySelector('body') as HTMLBodyElement;

    bodyElement.className = `font-${this.font} color-${this.color}`;
  }
}

const elements = (): SettingsHTMLElements => {
  const pomodoroInput = document.querySelector('.pomodoro-input') as HTMLInputElement;
  const shortBreakInput = document.querySelector('.short-break-input') as HTMLInputElement;
  const longBreakInput = document.querySelector('.long-break-input') as HTMLInputElement;
  const autoBreakInput = document.querySelector('.auto-break-input') as HTMLInputElement;
  const allFontElements = document.querySelectorAll('.font-settings li') as NodeListOf<HTMLLIElement>;
  const allColorElements = document.querySelectorAll('.color-settings li') as NodeListOf<HTMLLIElement>;
  const applyButton = document.querySelector('.apply-settings-btn') as HTMLButtonElement;

  return {
    pomodoroInput,
    shortBreakInput,
    longBreakInput,
    allFontElements,
    allColorElements,
    applyButton,
    autoBreakInput,
  };
};

export default Settings;
