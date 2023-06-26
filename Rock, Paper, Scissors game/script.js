// Define the messages and move list
const winMsg = 'Victory';
const loseMsg = 'Defeat';
const tieMsg = 'Tie';
const moveList = ['Rock', 'Paper', 'Scissors'];

// Get the necessary elements from the DOM
const moveDisplays = document.querySelectorAll(".move-display h2");
const btns = document.querySelectorAll("button");

// Function to start the game
const startGame = () => {
  // Set the status header
  document.getElementById("status-head").innerHTML = "Choose";
  
  // Loop through the buttons
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    // Remove the previous click event listener
    btn.removeEventListener("click", endGame);
    // Add a new click event listener
    btn.addEventListener("click", endGame);
    // Set button visibility, text, and display
    btn.style.visibility = 'visible';
    btn.innerHTML = moveList[i];
    btn.style.display = 'inline-block';
  }
  
  // Hide move displays
  moveDisplays.forEach(display => {
    display.style.visibility = 'hidden';
  });
}

// Function to end the game
const endGame = (event) => {
  // Get user and computer moves
  const userText = event.target.innerHTML;
  const userMove = moveList.indexOf(userText);
  const comMove = randomMove();
  
  // Calculate the result of the game
  const moves = calculate(userMove, comMove);
  
  // Update the status header and play again button
  document.getElementById("status-head").innerHTML = moves["Message"];
  btns[1].innerHTML = "Play Again";
  btns[1].addEventListener("click", startGame);
  
  // Hide appropriate buttons and show move displays
  for (let i = 0; i < btns.length; i = i + 2) {
    btns[i].style.visibility = 'hidden';
  }
  moveDisplays.forEach(display => {
    display.style.visibility = 'visible';
  });
  
  // Update move displays with chosen moves
  moveDisplays[0].innerHTML = "You chose " + moveList[moves["User"]];
  moveDisplays[1].innerHTML = "Computer chose " + moveList[moves["Computer"]];
}

// Function to generate a random move for the computer
const randomMove = () => {
  return Math.floor(Math.random() * 3);
}

// Function to calculate the result of the game
const calculate = (move1, move2) => {
  if (move1 == move2) {
    return {
      "Message": tieMsg,
      "User": move1,
      "Computer": move2
    };
  } else if ((move1 == 0 && move2 == 2) || (move1 == 1 && move2 == 0) || (move1 == 2 && move2 == 1)) {
    return {
      "Message": winMsg,
      "User": move1,
      "Computer": move2
    };
  } else {
    return {
      "Message": loseMsg,
      "User": move1,
      "Computer": move2
    };
  }
}

// Start the game when the document is loaded
document.addEventListener("DOMContentLoaded", startGame);
