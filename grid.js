const container = document.querySelector('.container');
const gridSizeInput = document.querySelector('#grid-size');
const currentSizeText = document.querySelector('#current-size');
const colorPicker = document.querySelector('#color-picker');
const addColorButton = document.querySelector('#add-color');
const clearPaletteButton = document.querySelector('#clear-palette');
const colorList = document.querySelector('#color-list');

let gridSize = parseInt(gridSizeInput.value);
let colors = [];


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function updateGridSize() {
  gridSize = parseInt(gridSizeInput.value);
  currentSizeText.textContent = `${gridSize}x${gridSize}`;

  container.innerHTML = '';

  container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('gridSquare');
    container.appendChild(gridSquare);
  }
}

function handleSquareChange(event) {
  const square = event.target;

  if (square.classList.contains('gridSquare')) {
    if (colors.length > 0) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      square.style.backgroundColor = randomColor;
    } else {
      square.style.backgroundColor = getRandomColor();
    }
  }
}


function addColor() {
  const color = colorPicker.value;
  colors.push(color);

  const colorElement = document.createElement('div');
  colorElement.classList.add('color');
  colorElement.style.backgroundColor = color;
  colorList.appendChild(colorElement);

  clearPaletteButton.style.visibility = 'visible';
}


function clearPalette() {
  colors = [];
  colorList.innerHTML = '';
  // Masquer le bouton Effacer la palette quand on clique dessus
  clearPaletteButton.style.visibility = 'hidden';
}


gridSizeInput.addEventListener('change', updateGridSize);
container.addEventListener('mouseover', handleSquareChange);
container.addEventListener('touchstart', handleSquareChange);
addColorButton.addEventListener('click', addColor);
clearPaletteButton.addEventListener('click', clearPalette);

// initialiser la taille de la grille
updateGridSize();
// Masquer le bouton Effacer la palette au chargement de la page
clearPaletteButton.style.visibility = 'hidden'; 