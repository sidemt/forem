import { Controller } from 'stimulus';

const recaptchaFields = document.querySelector('#recaptchaContainer');

export default class ConfigController extends Controller {
  static targets = [
    'authenticationProviders',
    'collectiveNoun',
    'requireCaptchaForEmailPasswordRegistration',
  ];

  disableTargetField(event) {
    const targetElementName = event.target.dataset.disableTarget;
    const targetElement = this[`${targetElementName}Target`];
    const newValue = event.target.checked;
    targetElement.disabled = newValue;

    // Disable the button generated by ERB for select tags
    if (targetElement.nodeName === 'SELECT') {
      const snakeCaseName = targetElementName.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`,
      );
      document.querySelector(
        `button[data-id=site_config_${snakeCaseName}]`,
      ).disabled = newValue;
    }
  }

  toggleGoogleRecaptchaFields() {
    if (this.requireCaptchaForEmailPasswordRegistrationTarget.checked) {
      recaptchaFields.classList.remove('collapse');
    } else {
      recaptchaFields.classList.add('collapse');
    }
  }
}