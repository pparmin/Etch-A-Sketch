/*
HOW DOES THIS WORK?
1. The createGrid function creates an initial drawing surface by assigning the container
the neccessary styling.

2. It also creates 32x32 squares. The squares are assigned an event listener that waits for the mouse to enter each square
and will then call the paintSquare() function.

3. paintSquare has a switch that will use a specific paint mode depending on the mode it is being given.
The standard mode will be "normal".

4. All settings buttons that handle a paint mode are assigned a 'click' event listener, which will call the setMode() function

5. The setMode() function simply assigns a new value to the currentMode variable by pulling it from the clicked element.

6. Since every square listens to the paintSquare() function, which in turn is dependent on the value of the currentMode variable,
you have a way to change the modes dynamically. 

createGrid --> newDiv.addEventListener('mouseenter', paintSquare) --> paintSquare(): What value is currentMode atm? --> change Mode with
setMode() --> rinse repeat
*/


const clearBtn = document.querySelector('#clear');
const newBtn = document.querySelector('#new');
const eraseBtn = document.querySelector('#eraser');
const normalBtn = document.querySelector('#normal');
const randomBtn = document.querySelector('#random');
const whiteBtn = document.querySelector('#white');

const gameWindow = document.querySelector('.game-window');
const squareNumber = 32;
const width = 480;
const height = 480;
const container = document.createElement('div');

const squares = [];
let currentMode = "normal";

// Function for creating the Grid
function createGrid(squareNumber) {
  container.setAttribute('id', 'container');
  container.style.cssText = `margin: 0 auto; 
  background-color: rgb(228, 166, 125);
  width: ${width}px;
  height: ${height}px;
  display: grid;
  cursor: crosshair;
  box-shadow: -1px 2px 12px 5px rgb(112, 80, 80);
  grid-template-columns: repeat(${squareNumber}, ${parseInt(height) / squareNumber}px);
  grid-template-rows: repeat(${squareNumber}, ${parseInt(width) / squareNumber}px);`;
  gameWindow.appendChild(container);

  for (let i = 1; i <= squareNumber; i++) {
    for (let j = 1; j <= squareNumber; j++) {
      const newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'item');
      newDiv.style['text-align'] = 'center';
      newDiv.style['grid-area'] = `${i} / ${j} / span 1 / span 1`;
      newDiv.style.opacity = '0.0';
      //newDiv.style.border =  '.5px dotted grey';
      container.appendChild(newDiv);
      console.log(`Created a div with row: ${i} and column: ${j}`);
      squares.push(newDiv);
      // puts an event listener on all divs that constantly listens for the paintSquare function on mouseenter
      newDiv.addEventListener('mouseenter', paintSquare);
    }
  }
}

// The paint function listens to the id value of currentMode that is assigned by clicking the button
// Depending on each buttons id value, the divs will be colored
function paintSquare(e) {
  let opacity = e.target.style.opacity;
  switch(currentMode) {
    case ("normal"):
      e.target.style.opacity = '1.0';
      e.target.style.backgroundColor = 'rgb(112, 80, 80)';
    break;

    case ("eraser"):
      e.target.style.opacity = '1.0';
      e.target.style.backgroundColor = 'rgb(228, 166, 125)';
    break;

    case ("random"):
      e.target.style.opacity = '1.0';
      e.target.style.backgroundColor = getRandomRGB();
    break;

    // The shader works by taking the initial value of the event.target (either 0.0 or 1.0)
    // and continously adding 0.1 to it until it reaches 1.0. 
    case ("shader"):
      if(opacity == 1) {
        return
      } else {
        e.target.style.opacity = Number(Math.min(e.target.style.opacity) + 0.1, 1.0);
        e.target.style.backgroundColor = 'rgb(112, 80, 80)';
      }
    break;
  }
}

// This function changes the modes by setting the currentMode variable to the id value of the clicked button
function setMode(e) {
  console.log(`current mode was: ${currentMode}`);
  currentMode = e.target.getAttribute('id');
  console.log(`current mode is now: ${currentMode}`);
}

// Function for creating a random RGB value
function getRandomRGB() {
  let r = Math.floor(Math.random() * Math.floor(256));
  let g = Math.floor(Math.random() * Math.floor(256));
  let b = Math.floor(Math.random() * Math.floor(256));
  return `rgb(${r}, ${g}, ${b})`;
}

// Clears the grid by assigning the base background color to all DOM elements stored
// in the HTML Collection Array
function clearGrid () {
  squares.forEach(square => {
    square.removeEventListener('mouseenter', paintSquare);
    square.style.backgroundColor = 'rgb(228, 166, 125)';
    square.addEventListener('mouseenter', paintSquare);
  });
}

function removeGrid () {
  container.textContent = '';
}

function resizeGrid () {  
  removeGrid(); 
  const newSize = prompt('Choose the new size of the grid (Between 1 - 64): ', 32);

  if (newSize == null) {
    alert('Please choose a size. The grid will be set to 32');
    createGrid(32);
  } else if (newSize <= 0 || newSize > 64) {
    alert('Please choose a number between 1 and 64');
    createGrid(32);
  } else {
    createGrid(newSize);
  }
}

createGrid(squareNumber); 

const modeButtons = document.querySelectorAll('.mode');
modeButtons.forEach(button => button.addEventListener('click', setMode));

newBtn.addEventListener('click', resizeGrid);
clearBtn.addEventListener('click', clearGrid);
