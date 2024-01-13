/* eslint-disable editorconfig/editorconfig */
const bodyElement = document.body;
const btnRandomColor = 'button-random-color';

const createDivContainer = () => {
  const divContainer = document.createElement('div');
  divContainer.id = 'container';
  divContainer.className = 'container';
  bodyElement.appendChild(divContainer);
};

const createTitle = () => {
  const divContainer = document.getElementById('container');
  const genTitle = document.createElement('h1');
  genTitle.id = 'title';
  genTitle.className = 'title';
  genTitle.innerText = 'Paleta de Cores';
  divContainer.appendChild(genTitle);
};

const genPalette = () => {
  const divContainer = document.getElementById('container');
  const createPalette = document.createElement('div');
  createPalette.id = 'color-palette';
  divContainer.appendChild(createPalette);

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

const paintPaletteStorage = () => {
  const palette = document.querySelectorAll('.color');
  const paletteStorage = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 0; index < palette.length; index += 1) {
    palette[index].style.backgroundColor = paletteStorage[index];
  }
};

const paintPalette = () => {
  const palette = document.querySelectorAll('.color');

  for (let index = 0; index < palette.length; index += 1) {
    if (palette[0] === palette[index]) {
      palette[index].style.backgroundColor = 'black';
    } else {
      palette[index].style.backgroundColor = randomColor(); // Corrigido aqui
    }
  }
  savePaletteLocalStorage();
};

const resetBoard = () => {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    if (pixels) {
      pixels[index].style.backgroundColor = 'white';
    }
  }
};

const pincel = () => {
  const corPincel = document.querySelector('.selected').style.backgroundColor;
  return corPincel;
};

const palettePainted = () => {
  if (localStorage.getItem('colorPalette') === null) {
    paintPalette();
  } else {
    paintPaletteStorage();
  }
};

const createButton = () => {
  const divContainer = document.getElementById('container');
  const createBtn = document.createElement('button');
  createBtn.innerText = 'Cores aleatórias';
  createBtn.id = btnRandomColor;
  createBtn.className = btnRandomColor;
  divContainer.appendChild(createBtn);
  createBtn.addEventListener('click', paintPalette);
};

const createResetButton = () => {
  const divContainer = document.getElementById('container');
  const createResetBtn = document.createElement('button');
  createResetBtn.innerText = 'Limpar';
  createResetBtn.id = 'button-clear-board';
  createResetBtn.className = 'button-clear-board';
  divContainer.appendChild(createResetBtn);
  createResetBtn.addEventListener('click', resetBoard);
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

const createBoardSizeInput = () => {
  const divContainer = document.getElementById('container');
  const input = document.createElement('input');
  input.type = 'number';
  input.id = 'board-size';
  input.className = 'board-size';
  input.placeholder = 'Tamanho do quadro';
  divContainer.appendChild(input);
};

const loadBoardSizeLocalStorage = () => localStorage.getItem('boardSize');

const createBoardCustom = (size = 5) => {
  const divContainer = document.getElementById('container');
  let existingBoard = document.getElementById('pixel-board');

  if (existingBoard) {
    existingBoard.innerHTML = ''; // Limpa o conteúdo existente
  } else {
    existingBoard = document.createElement('div');
    existingBoard.id = 'pixel-board';
    existingBoard.className = 'pixel-board';
    divContainer.appendChild(existingBoard);
  }

  existingBoard.style.gridTemplateColumns = `repeat(${size}, 40px)`;
  existingBoard.style.gridTemplateRows = `repeat(${size}, 40px)`;

  for (let index = 0; index < size * size; index += 1) {
    const createPixel = document.createElement('div');
    createPixel.className = 'pixel';
    createPixel.style.backgroundColor = 'white';
    createPixel.style.border = '1px solid black';
    existingBoard.appendChild(createPixel);
  }

};

const limitBoardSize = (size) => {
  const minSize = 5;
  const maxSize = 50;

  if (size < minSize) return minSize;
  if (size > maxSize) return maxSize;

  return size;
};

const generateBoard = () => {
  const boardSize = document.getElementById('board-size');
  const savedBoardSizeLocalStorage = loadBoardSizeLocalStorage();
  const size = parseInt(boardSize.value, 10);

  if (Number.isNaN(size) || size <= 0) {
    alert('Board inválido!');
    return;
  }

  const limitSize = savedBoardSizeLocalStorage || limitBoardSize(size);
  saveLocalStorage('boardSize', limitSize);
  createBoardCustom(limitSize);
  pintar();
  selecionado();
};

const createGenerateBoardButton = () => {
  const divContainer = document.getElementById('container');
  const btnCreateBoard = document.createElement('button');
  btnCreateBoard.id = 'generate-board';
  btnCreateBoard.textContent = 'VQV';
  btnCreateBoard.addEventListener('click', generateBoard);
  divContainer.appendChild(btnCreateBoard);
};

window.onload = function () {
  createDivContainer();
  createBoardSizeInput();
  createGenerateBoardButton();
  createTitle();
  genPalette();
  paintPaletteStorage();
  createBoardCustom();
  palettePainted();
  createButton();
  createResetButton();
  selecionado();
  pintar();
  savePaletteLocalStorage();
  paintPaletteStorage();
};
