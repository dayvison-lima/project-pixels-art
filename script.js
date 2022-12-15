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
        createDiv.className = 'color';
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
     else if (randomColor !== 'rgb(255, 255, 255)' && randomColor !== 'rgb(0, 0, 0)'){
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







// const PaletteSelectedToggle = (event) => {
//   const palette = document.querySelectorAll('.color');
//   for (let index = 0; index < palette.length; index += 1){
//     if(palette[index].classList.contains('selected')){
//       palette[index].classList.remove('selected');
//     };
//   };

//   event.target.classList.add('selected');
// };

// const paletteEventListener = () => {
//   const palette = document.querySelectorAll('.color');
//   for (let index = 0; index < palette.length; index += 1){
//     palette[index].addEventListener('click', PaletteSelectedToggle);
//   };
// };

const createBoard = () => {
  const createDiv = document.createElement('div');
  createDiv.id = 'pixel-board';
  createDiv.style.border = '1px solid black';
  createDiv.style.width = '125px';
  createDiv.style.height = '125px';
  createDiv.style.backgroundColor = 'white';

  
  
  bodyElement.appendChild(createDiv);
};

// let button = document.querySelector('#');
// button.addEventListener('click', paintPalette);








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
  
  
  // paletteEventListener();
  
  
};