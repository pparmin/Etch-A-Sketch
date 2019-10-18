function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createGrid(squareNumber, width, height) {
  const container = document.createElement('div');
  container.setAttribute('class', 'container');
  container.style.cssText = `margin: 0 auto; 
  background-color: rgb(228, 166, 125);
  width: ${width}px;
  height: ${height}px;
  display: grid;
  cursor: crosshair;
  box-shadow: -1px 2px 12px 5px rgb(112, 80, 80);
  grid-template-columns: repeat(${squareNumber}, ${parseInt(height) / squareNumber}px);
  grid-template-rows: repeat(${squareNumber}, ${parseInt(width) / squareNumber}px);`;

  console.log(parseInt(height) / squareNumber);

  gameWindow.appendChild(container);

  for (let i = 0; i < squareNumber; i++) {
    for (let j = 0; j < squareNumber; j++) {

      function doPaint(r, g, b) {
        newDiv.addEventListener('mouseover', (e) => {
          newDiv.style['background-color'] = `rgb(${r}, ${g}, ${b})`;
          newDiv.style.transform = 'scale(1.1)';
        });

        newDiv.addEventListener('mouseout', (e) => {
          newDiv.style.transform = 'scale(1.0)';
        });
      }

      const newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'item');
      newDiv.style['text-align'] = 'center';
      newDiv.style['grid-area'] = `${i} / ${j} / span 1 / span 1`;
      container.appendChild(newDiv);

      // "Hover" effect
      newDiv.addEventListener('mouseover', e => {

        newDiv.style['background-color'] = 'rgb(112, 80, 80)';
        newDiv.style.transform = 'scale(1.1)';
      });

      newDiv.addEventListener('mouseout', e => {
        newDiv.style.transform = 'scale(1.0)';
      });

      // Remove painted surface
      clearBtn.addEventListener('click', e => {
        newDiv.style['background-color'] = 'rgb(228, 166, 125)';
      });

      // Eraser 
      eraseBtn.addEventListener('click', e => doPaint(228, 166, 125));

      randomBtn.addEventListener('click', () => doPaint(getRandom(255), getRandom(255), getRandom(255)));
      
      whiteBtn.addEventListener('click', () => doPaint(255, 255, 255));

      normalBtn.addEventListener('click', () => doPaint(112, 80, 80));
    }
  }

  newBtn.addEventListener('click', e => {

    gameWindow.removeChild(container);

    newSquareNumber = prompt("Choose the size of the matrix: (Max 64)");
    if (newSquareNumber > 64) {
      alert("Please choose a number smaller than or equal to 64");
      createGrid(32, 480, 480);
    } else { 
      createGrid(newSquareNumber, 480, 480);
    }
  });
}

const clearBtn = document.querySelector('#clear');
const newBtn = document.querySelector('#new');
const eraseBtn = document.querySelector('#eraser');
const normalBtn = document.querySelector('#normal');
const randomBtn = document.querySelector('#random');
const whiteBtn = document.querySelector('#white');

const gameWindow = document.querySelector('.game-window');

window.onload = createGrid(32, 480, 480); 
