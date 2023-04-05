const toggleModal = () => {
  const settingsIcon = document.querySelector('.settings-icon') as HTMLDivElement;
  const settingsModal = document.querySelector('.settings-modal') as HTMLDivElement;
  const closeModalBtn = document.querySelector('.settings-modal .close-btn') as HTMLDivElement;

  settingsIcon.addEventListener('click', () => {
    settingsModal.classList.add('open');
  });

  settingsModal.addEventListener('click', (e) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains('settings-modal')) {
      settingsModal.classList.remove('open');
    }
  });

  closeModalBtn.addEventListener('click', () => {
    settingsModal.classList.remove('open');
  });
};

export default toggleModal;
