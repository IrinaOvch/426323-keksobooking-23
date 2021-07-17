const DOWNLOAD_ERROR_MESSAGE = 'При загрузке данных с сервера произошла ошибка, пожалуйста, перезагрузите страницу';

const mapCanvas = document.querySelector('.map__canvas');
const mapSection = document.querySelector('.map');

const showDowloadErrorWindow = () => {
  const downloadErrorAlert = document.createElement('p');
  downloadErrorAlert.style = `
    position: absolute;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    color: white;
    font-size: 24px;
    padding: 15px 0;
    margin: 0;
    text-align: center;
  `;
  mapCanvas.style.zIndex = 1;

  downloadErrorAlert.textContent = DOWNLOAD_ERROR_MESSAGE;

  mapSection.appendChild(downloadErrorAlert);
};

export {showDowloadErrorWindow};
