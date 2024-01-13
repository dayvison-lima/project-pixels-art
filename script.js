/* eslint-disable editorconfig/editorconfig */
const bodyElement = document.body;
const btnRandomColor = 'button-random-color';

const createTitle = () => {
  const genTitle = document.createElement('h1');
  genTitle.id = 'title';
  genTitle.className = 'title';
  genTitle.innerText = 'Paleta de Cores';
  bodyElement.appendChild(genTitle);
};

const genPalette = () => {
  const createPalette = document.createElement('div');
  createPalette.id = 'color-palette';
  bodyElement.appendChild(createPalette);

  for (let index = 0; index < 4; index += 1) {
    const createDiv = document.createElement('div');
    createDiv.className = `color color${index}`;
    createDiv.style.width = '40px';
    createDiv.style.height = '40px';

    if (index === 0) {
      createDiv.classList.add('selected');
    }

    createPalette.appendChild(createDiv);
  }
};

const randomColor = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return `#${color}`;
};

const saveLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const savePaletteLocalStorage = () => {
  const palette = document.querySelectorAll('.color');
  const paletteArray = [];
  for (let index = 0; index < palette.length; index += 1) {
    paletteArray.push(palette[index].style.backgroundColor);
  }
  saveLocalStorage('colorPalette', JSON.stringify(paletteArray));
};

const paintPalette = () => {
  const palette = document.querySelectorAll('.color');

  for (let index = 0; index < palette.length; index += 1) {
    if (palette[0] === palette[index]) {
      palette[index].style.backgroundColor = 'black';
    } else if (randomColor !== 255 && randomColor !== 0) {
      palette[index].style.backgroundColor = randomColor();
    }
  }
  savePaletteLocalStorage();
};

const pincel = () => {
  const corPincel = document.querySelector('.selected').style.backgroundColor;

  return corPincel;
};

const paintPaletteStorage = () => {
  const palette = document.querySelectorAll('.color');
  const paletteStorage = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 0; index < palette.length; index += 1) {
    palette[index].style.backgroundColor = paletteStorage[index];
  }
};

const palettePainted = () => {
  if (localStorage.getItem('colorPalette') === null) {
    paintPalette();
  } else {
    paintPaletteStorage();
  }
};

const createButton = () => {
  const createBtn = document.createElement('button');
  createBtn.innerText = 'Cores aleatórias';
  createBtn.id = btnRandomColor;
  createBtn.className = btnRandomColor;
  bodyElement.appendChild(createBtn);
};

const createResetButton = () => {
  const createResetBtn = document.createElement('button');
  createResetBtn.innerText = 'Limpar';
  createResetBtn.id = 'button-clear-board';
  createResetBtn.className = 'button-clear-board';
  bodyElement.appendChild(createResetBtn);
};

const createBoard = () => {
  const createDiv = document.createElement('div');
  createDiv.id = 'pixel-board';
  createDiv.className = 'pixel-board';

  bodyElement.appendChild(createDiv);

  for (let index = 0; index < 25; index += 1) {
    const createPixel = document.createElement('div');
    createPixel.className = 'pixel';
    createPixel.style.backgroundColor = 'white';
    createPixel.style.width = '40px';
    createPixel.style.height = '40px';
    createPixel.style.border = '1px solid black';
    createDiv.appendChild(createPixel);
  }
};

const selecionado = () => {
  const tintas = document.querySelectorAll('.color');

  for (let index = 0; index < tintas.length; index += 1) {
    tintas[index].addEventListener('click', (event) => {
      const selected = document.querySelector('.selected');
      if (selected) {
        selected.classList.remove('selected');
      }

      event.target.classList.add('selected');
    });
  }
};

const pintar = () => {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', () => {
      pixels[index].style.backgroundColor = pincel();
    });
  }
};

const resetBoard = () => {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    if (pixels) {
      pixels[index].style.backgroundColor = 'white';
    }
  }
};

savePaletteLocalStorage();
saveLocalStorage();

window.onload = () => {
  createTitle();
  genPalette();
  createBoard();
  randomColor();
  palettePainted();
  createButton();
  const colorButton = document.getElementById(btnRandomColor);
  colorButton.addEventListener('click', paintPalette);
  createResetButton();
  const resetButton = document.querySelector('#btn-clear-board');
  resetButton.addEventListener('click', resetBoard);
  selecionado();
  pintar();
};