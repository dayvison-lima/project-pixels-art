const bodyElement = document.body;

const createTitle = () => {
    const genTitle = document.createElement('h1');
    genTitle.id = 'title'
    genTitle.innerText = 'Paleta de Cores';
    bodyElement.appendChild(genTitle);

    
  };

const genPalette = (div) => {
    const createPalette = document.createElement('div');
    createPalette.id = 'color-palette';
    bodyElement.appendChild(createPalette);
    
    for(let index = 0; index < 4; index += 1){
    
        const createDiv = document.createElement('div');
        createDiv.className = `color color${index}`;
        createDiv.style.border = '1px solid black';
        createDiv.style.width = '40px';
        createDiv.style.height = '40px';

        if(index === 0){
          createDiv.classList.add('selected');
        };

        

        createPalette.appendChild(createDiv);

    };
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
  for (let index = 0; index < palette.length; index += 1){
    paletteArray.push(palette[index].style.backgroundColor);
  };
  saveLocalStorage('colorPalette', JSON.stringify(paletteArray));
};

const paintPalette = () => {
  const palette = document.querySelectorAll('.color');
  

  for (let index = 0; index < palette.length; index += 1){
    if (palette[0] === palette[index]){
      palette[index].style.backgroundColor = 'black';
    } 
     else if (randomColor !== 255 && randomColor !== 0){
      palette[index].style.backgroundColor = randomColor();
    };
  };
  savePaletteLocalStorage();
}

const paintPaletteStorage = () => {
  const palette = document.querySelectorAll('.color');
  const paletteStorage = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 0; index < palette.length; index += 1){
    palette[index].style.backgroundColor = paletteStorage[index];
  };
};

const palettePainted = () => {
  if(localStorage.getItem('colorPalette') === null){
    paintPalette();
  } else {
    paintPaletteStorage();
  }
}

const createButton = () => {
  const createButton = document.createElement('button');
  createButton.innerText = 'Cores aleatórias';
  createButton.id = 'button-random-color';
  bodyElement.appendChild(createButton);
};

const createBoard = () => {
  const createDiv = document.createElement('div');
  createDiv.id = 'pixel-board';
  // createDiv.style.border = '1px solid black';
  createDiv.style.width = '250px';
  createDiv.style.height = '250px';
  
  bodyElement.appendChild(createDiv);
  for(let index = 0; index < 25; index += 1){
    const createPixel = document.createElement('div');
    createPixel.className = 'pixel';
    createPixel.style.backgroundColor = 'white';
    createPixel.style.width = '40px';
    createPixel.style.height = '40px'
    createPixel.style.border = '1px solid black';
  

    createDiv.appendChild(createPixel);
  }
  
  
};


const selecionado = () => {
  const tintas = document.querySelectorAll('.color');

  for (let index = 0; index < tintas.length; index += 1){
    tintas[index].addEventListener('click', (event) => {
      const selected = document.querySelector('.selected');
      if(selected){
        selected.classList.remove('selected');
      };

        event.target.classList.add('selected');
    });
  };
};

const pincel = () => {
  const corPincel = document.querySelector('.selected').style.backgroundColor;
  return corPincel;
}


const pintar = () => {
  const pixels = document.querySelectorAll('.pixel')
  for (let index = 0; index < pixels.length; index += 1){
    pixels[index].addEventListener('click', () => {
      pixels[index].style.backgroundColor = pincel();
    });
  };
};





window.onload = () => {

  
  
  createTitle();
  genPalette();
  randomColor();
  palettePainted();
 
  savePaletteLocalStorage();
  saveLocalStorage();


  
  
  
  
  
  createButton();

  const colorButton = document.getElementById('button-random-color');
  colorButton.addEventListener('click', paintPalette);
  
  createBoard();
  selecionado();
  pintar();

  
  
  
  // paletteEventListener();




  
};