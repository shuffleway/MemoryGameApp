const start = document.querySelector('.start');
const gameContainer = document.querySelector('#game');

// Create an array to hold 2 colors:
let colorNumber = new Array();

let counter = 0; //counter for Colors
let count = 0;
let timeOutId;

let selected = [];

//Array of Colors
const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

// function to shuffle an array of colors
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

//colorArray variables
let colorArray = shuffle(COLORS);

let nocardClick = false;

//START PAGE
startPage();

start.addEventListener('click', function(e){
    if(e.target.tagName === 'BUTTON')
    {
        e.target.parentElement.remove();
       
        //create div with color as class
        createDivsForColors(colorArray);
    }  
});


//Create div tag and add Color as class for each div
function createDivsForColors(divColors)
{
   for(const color1 of divColors)
   {   
      const div = document.createElement('div'); //Create div tag
      div.classList.add(color1);   //Add Colors as Class 
      div.addEventListener('click', handleCardClick);
      gameContainer.appendChild(div); //append the div to the parent div container  
   }
}

//This method reset the game by deleting all the color div
function resetGame(){

  const colorDiv2 = document.querySelectorAll('div');

  for(let div of colorDiv2)
  {
    if(div.style.backgroundColor != '')
    {
      div.remove();
    }
  }
}

//This method takes us back to the start page. 
function startPage()
{
  //create a div to hold the start page elements. 
  const div = document.createElement('div');
  div.innerHTML = '<label> MATCH <br/> -A- <br/> CARD <br/></label> <br/> <button>START</button>';
   
  //Select the div which act as container for start page element
   const divStart = document.querySelector('.start');
   divStart.appendChild(div);
   console.log(divStart);
}


//This function handles all the clicks. 
function handleCardClick(e){

  clearTimeout(timeOutId);

  // check if card has been clicked and return.
  if (e.target.dataset.clicked == "true") {
    e.target.dataset.clicked = "false";
    return;
  }
  
  e.target.dataset.clicked = "true";

 
  if (nocardClick) {
    return;
  }

  //set background Color
e.target.style.backgroundColor = `${e.target.classList[0]}`;

//add target className to Array of color Number
colorNumber.push(e.target.className);


    if(colorNumber.length === 2)
    { 
      nocardClick = true;

      const colorDiv = document.querySelectorAll('div');

        if(colorNumber[0] !== colorNumber[1])
        {
         
          setTimeout(function(arr, arr2){

            for(let div of colorDiv)
            {
                if(div.classList != '' && arr === div.className)
                {
                   div.style.backgroundColor = '';
                   div.dataset.clicked = 'false';
                }
                if(div.classList != '' && arr2 === div.className)
                {
                   div.style.backgroundColor = '';
                   div.dataset.clicked = 'false';
                }
            }
            nocardClick = false;
            
          }, 1000, colorNumber[0], colorNumber[1]);
        }
        else
        {

          count = 0;
          const colorDiv = document.querySelectorAll('div');
          for(let div of colorDiv)
          {
             if(div.style.backgroundColor != '')
             {
              div.removeEventListener('click', handleCardClick);
                  count++
             }
          }
      
          if(count === COLORS.length)
          {
            
             alert('GAME OVER');

              //START PAGE
              startPage();

             resetGame();
             //shuffle(COLORS);
          }

          selected.push(colorNumber[0])
          nocardClick = false;
        }

      //Reset the array container
      //By Popping items out from the array
      colorNumber.pop();
      colorNumber.pop();
    }
    
    //Set time out flip the card when user click a card and delay
    timeOutId = setTimeout(function(arr)
    {   
      const colorDiv = document.querySelectorAll('div');

      for(let div of colorDiv)
      {
        if(div.classList != '' && arr === div.className)
        {
          div.style.backgroundColor = '';
          div.dataset.clicked = 'false';
        }
      }
        colorNumber.pop(); //reset the colorNumber Array
    }, 1000, colorNumber[0]);
}