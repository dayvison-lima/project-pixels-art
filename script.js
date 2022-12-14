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

  window.onload = () => {
    createTitle();
};