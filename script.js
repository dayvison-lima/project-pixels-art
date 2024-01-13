// eslint-disable-next-line max-lines
/* eslint-disable editorconfig/editorconfig */
const bodyElement = document.body;
const btnRandomColor = 'button-random-color';
const sizeBoard = 'board-size';
const pixelBoard = 'pixel-board';

// Função para criar o container principal
const createDivContainer = () => {
  const divContainer = document.createElement('div');
  divContainer.id = 'container';
  divContainer.className = 'container';
  bodyElement.appendChild(divContainer);
};

// Função para criar o título
const createTitle = () => {
  const divContainer = document.getElementById('container');
  const genTitle = document.createElement('h1');
  genTitle.id = 'title';
  genTitle.className = 'title';
  genTitle.innerText = 'Paleta de Cores';
  divContainer.appendChild(genTitle);
};

// Função para gerar a paleta de cores
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

// Função para gerar uma cor aleatória
const randomColor = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return `#${color}`;
};

// Função para salvar no Local Storage
const saveLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

// Função para salvar a paleta de cores no Local Storage
const savePaletteLocalStorage = () => {
  const palette = document.querySelectorAll('.color');
  const paletteArray = [];
  for (let index = 0; index < palette.length; index += 1) {
    paletteArray.push(palette[index].style.backgroundColor);
  }
  saveLocalStorage('colorPalette', JSON.stringify(paletteArray));
};

// Função para pintar a paleta de cores a partir do Local Storage
const paintPaletteStorage = () => {
  const palette = document.querySelectorAll('.color');
  const paletteStorage = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 0; index < palette.length; index += 1) {
    palette[index].style.backgroundColor = paletteStorage[index];
  }
};

// Função para pintar a paleta de cores aleatoriamente
const paintPalette = () => {
  const palette = document.querySelectorAll('.color');

  for (let index = 0; index < palette.length; index += 1) {
    if (palette[0] === palette[index]) {
      palette[index].style.backgroundColor = 'black';
    } else {
      palette[index].style.backgroundColor = randomColor();
    }
  }
  savePaletteLocalStorage();
};

// Função para resetar o board
const resetBoard = () => {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    if (pixels) {
      pixels[index].style.backgroundColor = 'white';
    }
  }
};

// Função para obter a cor do pincel
const pincel = () => {
  const corPincel = document.querySelector('.selected').style.backgroundColor;
  return corPincel;
};

// Função para verificar se há uma paleta de cores salva e pintar
const palettePainted = () => {
  if (localStorage.getItem('colorPalette') === null) {
    paintPalette();
  } else {
    paintPaletteStorage();
  }
};

// Função para criar o botão de cores aleatórias
const createButton = () => {
  const divContainer = document.getElementById('container');
  const createBtn = document.createElement('button');
  createBtn.innerText = 'Cores aleatórias';
  createBtn.id = btnRandomColor;
  createBtn.className = btnRandomColor;
  divContainer.appendChild(createBtn);
  createBtn.addEventListener('click', paintPalette);
};

// Função para criar o botão de resetar o board
const createResetButton = () => {
  const divContainer = document.getElementById('container');
  const createResetBtn = document.createElement('button');
  createResetBtn.innerText = 'Limpar';
  createResetBtn.id = 'button-clear-board';
  createResetBtn.className = 'button-clear-board';
  divContainer.appendChild(createResetBtn);
  createResetBtn.addEventListener('click', resetBoard);
};

// Função para adicionar o evento de seleção de cor
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

// Função para adicionar o evento de pintura no pixel
const pintar = () => {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', () => {
      pixels[index].style.backgroundColor = pincel();
    });
  }
};

// Função para criar a entrada de tamanho do board
const createBoardSizeInput = () => {
  const divContainer = document.getElementById('container');
  const input = document.createElement('input');
  input.type = 'number';
  input.id = sizeBoard;
  input.className = sizeBoard;
  input.placeholder = 'Tamanho do quadro';
  divContainer.appendChild(input);
};

// Função para carregar o tamanho do board do Local Storage
const loadBoardSizeLocalStorage = () => localStorage.getItem('boardSize');

// Função para criar o board personalizado
const createBoardContainer = () => {
  const divContainer = document.getElementById('container');
  let existingBoard = document.getElementById(pixelBoard);

  if (existingBoard) {
    existingBoard.innerHTML = ''; // Limpa o conteúdo existente
  } else {
    existingBoard = document.createElement('div');
    existingBoard.id = pixelBoard;
    existingBoard.className = pixelBoard;
    divContainer.appendChild(existingBoard);
  }

  return existingBoard;
};

// Função para criar os elementos de pixel no board
const createPixelElements = (size, existingBoard) => {
  const existingBoardLoad = existingBoard;
  existingBoardLoad.style.gridTemplateColumns = `repeat(${size}, 40px)`;
  existingBoardLoad.style.gridTemplateRows = `repeat(${size}, 40px)`;

  for (let index = 0; index < size * size; index += 1) {
    const createPixel = document.createElement('div');
    createPixel.className = 'pixel';
    createPixel.style.backgroundColor = 'white';
    createPixel.style.border = '1px solid black';
    existingBoardLoad.appendChild(createPixel);
  }
};

// Função para criar o board personalizado
const createBoardCustom = () => {
  const savedBoardSizeLocalStorage = loadBoardSizeLocalStorage();
  const size = savedBoardSizeLocalStorage ? parseInt(savedBoardSizeLocalStorage, 10) : 5;

  const existingBoard = createBoardContainer();
  createPixelElements(size, existingBoard);
  saveLocalStorage('boardSize', size);
};

// Função para limitar o tamanho do board
const limitBoardSize = (size) => {
  const minSize = 5;
  const maxSize = 50;

  if (size < minSize) return minSize;
  if (size > maxSize) return maxSize;

  return size;
};

// Função para gerar o board
const generateBoard = () => {
  const boardSize = document.getElementById('board-size');
  const size = parseInt(boardSize.value, 10);

  if (Number.isNaN(size) || size <= 0) {
    alert('Board inválido!');
    return;
  }

  const limite = limitBoardSize(size);

  saveLocalStorage('boardSize', limite);
  createBoardCustom();
  pintar();
  selecionado();
};

// Função para criar o botão de gerar board
const createGenerateBoardButton = () => {
  const divContainer = document.getElementById('container');
  const btnCreateBoard = document.createElement('button');
  btnCreateBoard.id = 'generate-board';
  btnCreateBoard.textContent = 'Gerar quadro';
  btnCreateBoard.addEventListener('click', generateBoard);
  divContainer.appendChild(btnCreateBoard);
};

// Função principal para inicializar tudo ao carregar a página
const initialize = () => {
  createDivContainer();
  createBoardSizeInput();
  createGenerateBoardButton();
  createTitle();
  genPalette();
  palettePainted();
  createBoardCustom();
  createButton();
  createResetButton();
  selecionado();
  pintar();
};

// Carregar elementos ao carregar a página
window.onload = initialize;
