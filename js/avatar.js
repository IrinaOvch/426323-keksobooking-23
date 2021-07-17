const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const AVATAR_DEFAULT = 'img/muffin-grey.svg';

const userAvatarInput = document.querySelector('.ad-form-header__input');
const offerImageInput = document.querySelector('.ad-form__input');
const userAvatarPreview = document.querySelector('.ad-form-header__preview img');
const offerImagePreviewContainer = document.querySelector('.ad-form__photo');

const showPreview = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load',() => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const userAvatarInputChangeHandler = () => {
  showPreview(userAvatarInput, userAvatarPreview);
};

const offerImageInputChangeHandler = () => {
  const offerImagePreview = document.createElement('img');
  offerImagePreview.style = `
    width: 100%;
    height: 100%;
  `;
  offerImagePreviewContainer.appendChild(offerImagePreview);
  showPreview(offerImageInput, offerImagePreview);
};

const clearPreviews = () => {
  offerImagePreviewContainer.innerHTML = '';
  userAvatarPreview.src = AVATAR_DEFAULT;
};

const setAvatarInputsListeners = () => {
  userAvatarInput.addEventListener('change', userAvatarInputChangeHandler);
  offerImageInput.addEventListener('change', offerImageInputChangeHandler);
};

export { setAvatarInputsListeners, clearPreviews };
