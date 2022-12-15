// const createTitle = () => {
//     const genTitle = document.createElement('h1');
//     genTitle.innerText = 'Paleta de Cores';
//     body.appendChild(genTitle);
// };

// window.onload = () => {
//     createTitle();
// };

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

        createPalette.appendChild(createDiv);

    };
};

// const createPalette = () => {
//     const createDiv = document.createElement('div');


    
// }

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
  saveLocalStorage('colors', JSON.stringify(paletteArray));
};

const paintPalette = () => {
  const palette = document.querySelectorAll('.color');
  for (let index = 0; index < palette.length; index += 1){
    if (palette[0] === palette[index]){
      palette[index].style.backgroundColor = 'black';
    } else {
      palette[index].style.backgroundColor = randomColor();
    };
  };
  savePaletteLocalStorage();
}



window.onload = () => {
  createTitle();
  genPalette();
  randomColor();
  saveLocalStorage();
  savePaletteLocalStorage();
  paintPalette();
};