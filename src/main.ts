import Settings from './settings';
import Pomodoro from './timer';
import toggleModal from './toggleModal';

const settings = new Settings();
settings.init();

const pomodoro = new Pomodoro();
pomodoro.init();

toggleModal();
