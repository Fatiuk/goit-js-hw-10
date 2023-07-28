export default class Loader {
  constructor({ hidden = false }) {
    this.refs = this.getRefs();

    hidden && this.hide();
  }

  getRefs() {
    const refs = {};
    refs.loader = document.querySelector('.loader-container');
    refs.loaderStatusSuccess = document.querySelector('.success');
    refs.loaderStatusError = document.querySelector('.error');

    return refs;
  }

  show() {
    this.refs.loader.classList.remove('is-hidden');
    this.refs.loaderStatusSuccess.classList.remove('is-hidden');
  }

  hide() {
    this.refs.loader.classList.add('is-hidden');
    this.refs.loaderStatusSuccess.classList.add('is-hidden');
  }

  showErrorLoader() {
    this.refs.loader.classList.remove('is-hidden');
    this.refs.loaderStatusSuccess.classList.add('is-hidden');
    this.refs.loaderStatusError.classList.remove('is-hidden');
  }
}
