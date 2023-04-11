import Settings from './settings';
import timer from './timer';
import toggleModal from './toggleModal';

const settings = new Settings();
settings.init();

toggleModal();
timer();
