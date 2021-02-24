const TILE_SIZE = 48;
const HELMET_OFFSET = 12;
const GAME_SIZE = TILE_SIZE * 20;

const root = document.documentElement;
root.style.setProperty('--tile-size',`${TILE_SIZE}px`); //48px
root.style.setProperty('--helmet-offset',`${HELMET_OFFSET}px`); //12px
root.style.setProperty('--game-size',`${GAME_SIZE}px`); //960PX

function createBoard() {
  const boardElement = document.getElementById('board');

  function createElement(option) {
    let { item, top, left } = option;

    const htmlElement = document.createElement('div');
    htmlElement.className = item;
    htmlElement.style.top = `${top}px`;
    htmlElement.style.left = `${left}px`;


    boardElement.appendChild(htmlElement);

    function getNewDirection(buttonPressed) {
        switch (buttonPressed) {
            case 'ArrowUp': 
                 return { top: top - TILE_SIZE, left: left };
            case 'ArrowRight': 
                 return { top: top, left: left + TILE_SIZE };
            case 'ArrowDown': 
                 return { top: top + TILE_SIZE, left: left };
            case 'ArrowLeft': 
                 return { top: top, left: left - TILE_SIZE };

        default: 
        return {top: top, left: left };
        }
    }

    function move(buttonPressed) {
      const newDirection =  getNewDirection(buttonPressed);
      top = newDirection.top;
      left = newDirection.left;
      htmlElement.style.top = `${newDirection.top}px`;
      htmlElement.style.left = `${newDirection.left}px`;


    }
    return {
        move: move
    }
  }

  function createItem(options) {
      createElement(options);
  }

  function createHero(options) {
     const hero = createElement({
          item: 'hero',
          top: options.top,
          left: options.left,
          option: options});

    document.addEventListener('keydown', (event) => {
        hero.move(event.key)

    });
  }

  function createEnemy(options) {
    const enemy = createElement({    
        item: 'mini-demon',
        top: options.top,
        left: options.left,
        option: options
    });

    setInterval(() => {
        const direction = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
        const randomIndex = Math.floor (Math.random() * direction.length);
        const randomDirection = direction[randomIndex];

        enemy.move(randomDirection);
    },500) 

   
}

  return {
      createItem: createItem,
      createHero: createHero,
      createEnemy: createEnemy,
  }
}

 const board = createBoard();
 //item renderizado
 //top - number 
 //left - number
 board.createEnemy({ top: TILE_SIZE * 15, left: TILE_SIZE * 15});
 board.createEnemy({ top: TILE_SIZE * 15, left: TILE_SIZE * 16});
 board.createItem({ top: TILE_SIZE * 15, left: TILE_SIZE * 17});
 board.createHero({ top: TILE_SIZE * 14, left: TILE_SIZE * 10});



