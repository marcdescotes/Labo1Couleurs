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
  gridSize = parseInt(gridSizeInput.value); // Va chercher la taille de la grille demandée par l'utilisateur et la convertit en nombre entier
  currentSizeText.textContent = `${gridSize}x${gridSize}`; // Met à jour le texte indiquant la taille actuelle de la grille

  container.innerHTML = ''; // Vide les couleurs de la grille quand l'utilisateur change de taille

  /* https://css-tricks.com/introduction-fr-css-unit/ */
  container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // Définit le nombre de colonnes de la grille en fonction de la taille actuelle
  container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`; // Définit le nombre de lignes de la grille en fonction de la taille actuelle

  for (let i = 0; i < gridSize * gridSize; i++) { // Boucle pour créer les carrés de la grille en fonction de la taille actuelle
    const gridSquare = document.createElement('div'); // Crée un nouvel élément div pour représenter un carré de la grille
    gridSquare.classList.add('gridSquare'); // Ajoute la classe 'gridSquare' à l'élément div
    container.appendChild(gridSquare); // Ajoute le carré de la grille au conteneur (container)
  }
}


function handleSquareChange(event) {
  const square = event.target; // Récupère l'élément carré sur lequel l'événement a été déclenché

  if (square.classList.contains('gridSquare')) { // Vérifie si le carré possède la classe 'gridSquare'
    if (colors.length > 0) { // Vérifie si l'utilisateur a inséré des couleurs dans la palette
      const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Génère une couleur aléatoire à partir des couleurs sélectionnées dans la palette
      square.style.backgroundColor = randomColor; // Applique la couleur aléatoire au fond du carré
    } else {
      square.style.backgroundColor = getRandomColor(); // Si la palette est vide, applique une couleur aléatoire
    }
  }
}

// Fonction permettant à l'utilisateur d'ajouter des couleurs à la palette
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