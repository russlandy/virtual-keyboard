/* eslint-disable max-len */
const Keyboard = {
  elements: {
    title: null,
    textarea: null,
    main: null,
    buttonsContainer: null,
    buttons: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    // create elements for html
    this.elements.title = document.createElement('h1');
    this.elements.textarea = document.createElement('textarea');
    this.elements.main = document.createElement('div');
    this.elements.buttonsContainer = document.createElement('div');

    // add class to elements
    this.elements.title.classList.add('title');
    this.elements.title.innerHTML = 'Virtual Keyboard RS-School';
    this.elements.textarea.classList.add('textarea');

    this.elements.main.classList.add('keyboard');
    this.elements.buttonsContainer.classList.add('keyboard__buttons');
    this.elements.buttonsContainer.appendChild(this.createButtons());

    this.elements.buttons = this.elements.buttonsContainer.querySelectorAll('.keyboard__button');

    // add to DOM
    this.elements.main.appendChild(this.elements.buttonsContainer);
    document.body.appendChild(this.elements.title);
    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.main);
  },

  createButtons() {
    const fragment = document.createDocumentFragment();
    const buttonsArr = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
      'r_shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', 'l_shift',
      'r_ctrl', 'alt', 'space', 'alt', 'l_ctrl',
    ];

    // eslint-disable-next-line arrow-parens
    buttonsArr.forEach(btn => {
      const buttonElement = document.createElement('button');
      const insertBreak = ['backspace', 'p', 'enter', 'l_shift', 'l_ctrl'].indexOf(btn) !== -1;

      // add attributes
      buttonElement.setAttribute('type', 'button');
      buttonElement.classList.add('keyboard__button');

      switch (btn) {
        case 'backspace':
          buttonElement.classList.add('keyboard__button--wide');
          buttonElement.textContent = btn;

          buttonElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });

          break;

        case 'caps':
          buttonElement.classList.add('keyboard__button--wide');
          buttonElement.textContent = btn;

          buttonElement.addEventListener('click', () => {
            this.toggleCaps();
            buttonElement.classList.toggle('keyboard__button--active', this.properties.capsLock);
          });

          break;

        case 'enter':
          buttonElement.classList.add('keyboard__button--wide');
          buttonElement.textContent = btn;

          buttonElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'space':
          buttonElement.classList.add('keyboard__button--super-wide');
          buttonElement.textContent = btn;

          buttonElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        case 'l_shift':
          buttonElement.classList.add('keyboard__button--wide');
          buttonElement.textContent = btn;

          buttonElement.addEventListener('keydown', () => {
            this.toggleCaps();
            buttonElement.classList.toggle('keyboard__button--active', this.properties.capsLock);
            this.triggerEvent('oninput');
          });

          break;

        case 'r_shift':
          buttonElement.classList.add('keyboard__button--wide');
          buttonElement.textContent = btn;

          buttonElement.addEventListener('keydown', () => {
            this.toggleCaps();
            buttonElement.classList.toggle('keyboard__button--active', this.properties.capsLock);
            this.triggerEvent('oninput');
          });

          break;

        default:
          buttonElement.classList.add('keyboard__button');
          buttonElement.textContent = btn;

          buttonElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? btn.toUpperCase() : btn.toLowerCase();
            this.triggerEvent('oninput');
          });

          break;
      }
      // create linebreak for keyboard
      fragment.appendChild(buttonElement);
      if (insertBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  triggerEvent(handlerName) {
    console.log(`event trigger! event name: ${handlerName}`);
  },

  toggleCaps() {
    this.properties.capsLock = !this.properties.capsLock;
    // eslint-disable-next-line no-restricted-syntax
    for (const btn of this.elements.buttons) {
      if (btn.textContent.length === 1) {
        btn.textContent = this.properties.capsLock ? btn.textContent.toUpperCase() : btn.textContent.toLowerCase();
      }
    }
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
