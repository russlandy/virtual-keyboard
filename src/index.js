/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
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

    this.elements.textarea.setAttribute('autofocus', 'autofocus');

    this.elements.main.classList.add('keyboard');
    this.elements.buttonsContainer.classList.add('keyboard__buttons');
    this.elements.buttonsContainer.appendChild(this.createButtons());

    this.elements.buttons = this.elements.buttonsContainer.querySelectorAll('.keyboard__button');

    // add to DOM
    this.elements.main.appendChild(this.elements.buttonsContainer);
    document.body.appendChild(this.elements.title);
    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.main);

    // print in textarea
    document.querySelectorAll('.textarea').forEach((element) => {
      element.addEventListener('focus', () => {
        this.print(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });

    const keys = document.querySelectorAll('.keyboard__button');
    document.addEventListener('keydown', (e) => {
      for (let i = 0; i < keys.length; i++) {
        if (e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('keyname').toUpperCase()) {
          keys[i].classList.add('keyboard__button--active');
        }
        if (e.code == 'ShiftLeft') {
          document.getElementById('RightShift').classList.toggle('keyboard__button--active');
        }
        if (e.code == 'ShiftRight') {
          document.getElementById('LeftShift').classList.toggle('keyboard__button--active');
        }
        if (e.code == 'CapsLock') {
          document.getElementById('CapsLock').classList.toggle('keyboard__button--active');
          this.toggleCaps();
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      for (let i = 0; i < keys.length; i++) {
        // eslint-disable-next-line no-mixed-operators
        if (e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('keyname').toUpperCase()) {
          keys[i].classList.remove('keyboard__button--active');
        }
        if (e.code == 'ShiftLeft') {
          document.getElementById('RightShift').classList.remove('keyboard__button--active');
        }
        if (e.code == 'ShiftRight') {
          document.getElementById('LeftShift').classList.remove('keyboard__button--active');
        }
      }
    });
  },

  createButtons() {
    const fragment = document.createDocumentFragment();
    const buttonsArr = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
      'l_shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '▲', 'r_shift',
      'l_ctrl', 'l_alt', 'space', 'r_alt', 'r_ctrl', '◄', '▼', '►',
    ];

    // eslint-disable-next-line arrow-parens
    buttonsArr.forEach(btn => {
      const buttonElement = document.createElement('button');
      const insertBreak = ['backspace', 'p', 'enter', 'r_shift', '►'].indexOf(btn) !== -1;

      // add attributes
      buttonElement.setAttribute('type', 'button');
      buttonElement.classList.add('keyboard__button');

      switch (btn) {
        case 'backspace':
          buttonElement.classList.add('keyboard__button--wide');
          buttonElement.textContent = btn;
          buttonElement.setAttribute('keyname', 'Backspace');

          buttonElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });

          break;

        case 'caps':
          buttonElement.classList.add('keyboard__button');
          buttonElement.textContent = btn;
          buttonElement.setAttribute('keyname', 'CapsLock');
          buttonElement.setAttribute('id', 'CapsLock');

          buttonElement.addEventListener('click', () => {
            this.toggleCaps();
            buttonElement.classList.toggle('keyboard__button--active', this.properties.capsLock);
          });

          break;

        case 'enter':
          buttonElement.classList.add('keyboard__button--wide');
          buttonElement.textContent = btn;
          buttonElement.setAttribute('keyname', 'Enter');

          buttonElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'space':
          buttonElement.classList.add('keyboard__button--super-wide');
          buttonElement.textContent = btn;
          buttonElement.setAttribute('keyname', ' ');

          buttonElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        case 'l_shift':
          buttonElement.classList.add('keyboard__button');
          buttonElement.textContent = btn;
          buttonElement.setAttribute('keyname', 'Shift');
          buttonElement.setAttribute('id', 'LeftShift');

          buttonElement.addEventListener('mousedown', () => {
            this.toggleCaps();
            buttonElement.classList.toggle('keyboard__button--active', this.properties.capsLock);
            this.triggerEvent('oninput');
          });
          buttonElement.addEventListener('mouseup', () => {
            this.toggleCaps();
            buttonElement.classList.toggle('keyboard__button--active', this.properties.capsLock);
            this.triggerEvent('oninput');
          });

          break;

        case 'r_shift':
          buttonElement.classList.add('keyboard__button');
          buttonElement.textContent = btn;
          buttonElement.setAttribute('keyname', 'Shift');
          buttonElement.setAttribute('id', 'RightShift');

          buttonElement.addEventListener('mousedown', () => {
            this.toggleCaps();
            buttonElement.classList.toggle('keyboard__button--active', this.properties.capsLock);
            this.triggerEvent('oninput');
          });
          buttonElement.addEventListener('mouseup', () => {
            this.toggleCaps();
            buttonElement.classList.toggle('keyboard__button--active', this.properties.capsLock);
            this.triggerEvent('oninput');
          });

          break;

        case 'l_ctrl':
          buttonElement.classList.add('keyboard__button');
          buttonElement.textContent = 'ctrl';
          buttonElement.setAttribute('keyname', 'Control');
          buttonElement.setAttribute('id', 'LeftControl');

          buttonElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;
        case 'r_ctrl':
          buttonElement.classList.add('keyboard__button');
          buttonElement.textContent = 'ctrl';
          buttonElement.setAttribute('keyname', 'Control');
          buttonElement.setAttribute('id', 'RightControl');

          buttonElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'l_alt':
          buttonElement.classList.add('keyboard__button');
          buttonElement.textContent = 'alt';
          buttonElement.setAttribute('keyname', 'Alt');
          buttonElement.setAttribute('id', 'LeftAlt');

          buttonElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'r_alt':
          buttonElement.classList.add('keyboard__button');
          buttonElement.textContent = btn;
          buttonElement.setAttribute('keyname', 'Alt');
          buttonElement.setAttribute('id', 'RightAlt');

          buttonElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'tab':
          buttonElement.classList.add('keyboard__button--wide');
          buttonElement.textContent = btn;
          buttonElement.setAttribute('keyname', 'Tab');

          buttonElement.addEventListener('click', () => {
            this.properties.value += '  ';
            this.triggerEvent('oninput');
          });

          break;

        default:
          buttonElement.classList.add('keyboard__button');
          buttonElement.textContent = btn;
          buttonElement.setAttribute('keyname', btn);

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
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
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

  print(initialValue, oninput) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
