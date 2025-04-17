// these values are set at the beginning
// and then used throughout the game
let gameState = {
    players: 2,
    whoseTurn: 1,
    gameOver: false
}


// function that considers which player's turn it is and then
// changes the UI accordingly
function changePlayer() {
    // if the current player is player 1 at the end of a move
    if (gameState.whoseTurn === 1) {
        let playerTwoHealth = document.getElementById("playerTwoHealth");
        // converts the innerHTML from string to a number and stores it in a variable
        let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);
        // reduces by 10
        playerTwoHealthNum -= 10;
        // resets the HTML to the new value
        playerTwoHealth.innerHTML = playerTwoHealthNum;

        // checks if the player has reached 0 health
        if (playerTwoHealthNum <= 0) {
            // ensures health does not dig into the negative
            playerTwoHealth = 0;
            // ends the game
            gameOver();
        }
        else {
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 2;

            // grabs the 'playerName' element and changes the player's turn display
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    }
    // if the current player is player 2 at the end of a move
    else if (gameState.whoseTurn === 2) {
        let playerOneHealth = document.getElementById("playerOneHealth");
        // converts the innerHTML from string to a number and stores it in a variable
        let playerOneHealthNum = Number(playerOneHealth.innerHTML);
        // reduces by 10
        playerOneHealthNum -= 10;
        // resets the HTML to the new value
        playerOneHealth.innerHTML = playerOneHealthNum;
        // checks if the player has reached 0 health
        if (playerOneHealthNum <= 0) {
            // ensures health does not dig into the negative
            playerOneHealth = 0;
            // ends the game
            gameOver();
        } else {
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 1;
            // grabs the 'playerName' element
            let playerName = document.getElementById("playerName");
            // changes the player's turn display
            playerName.innerHTML = `Player ${gameState.whoseTurn}`
        }
    }
}

// if a player's health reaches 0 at the end of a turn, the game ends
// and the winner is announced
function gameOver() {
    let title = document.getElementById("title");
    title.style = "display: none;";
    let playerTurnDisplay = document.getElementById("playerTurn");
    playerTurnDisplay.style = "display: none;";

    let winningPlayer = document.getElementById("winningPlayer");
    winningPlayer.innerHTML = `Player ${gameState.whoseTurn} wins!`

    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style = "display: flex; flex-direction: column;";

    // grab player's one attack button
    let playerOneButton = document.getElementById("playerOneAttack");
    // remove player's one attack button
    playerOneButton.style.display = "none";
    // grab player's two attack button
    let playerTwoButton = document.getElementById("playerTwoAttack");
    // remove player's two attack button
    playerTwoButton.style.display = "none";

    // Player 1 won
    if (gameState.whoseTurn === 1) {
        // grab player two
        let playerTwo = document.getElementById("playerTwo");
        // remove player two completely
        playerTwo.style.display = "none";

        // grab player one
        let playerOneSprite = document.getElementById("playerOneSprite");
        // remove player one completely
        playerOneSprite.classList.add("winner-glow");
    }
    // Player 2 won
    else if (gameState.whoseTurn === 2) {
        // grab player one
        let playerOne = document.getElementById("playerOne");
        // remove player one completely
        playerOne.style.display = "none";

        // grab player two
        let playerTwoSprite = document.getElementById("playerTwoSprite");
        // remove player two completely
        playerTwoSprite.classList.add("winner-glow");
    }
}

// function that allows the player two attack button to reduce the player two's
// health
function attackPlayerTwo() {
    // compartmentalized function that will switch the player 2 attack button to inactive
    // and player 1 attack button to active using DOM manipulation
    // this also DISABLES the button, meaning they are not interactable
    function changeButtonStatus() {
        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
        playerTwoAttackButton.disabled = true;
        playerTwoAttackButton.classList.add("inactive");
        playerTwoAttackButton.classList.remove("active");

        let playerOneAttackButton = document.getElementById("playerOneAttack");
        playerOneAttackButton.disabled = false;
        playerOneAttackButton.classList.add("active");
        playerOneAttackButton.classList.remove("inactive");
    }

    // compartmentalized function that changes the player 1's sprite using the array
    // containing multiple images
    function animatePlayer() {
        // an array containing the images using in player one's animation
        // the indices are later used to cycle / "animate" when the player attacks
        let playerOneFrames = [
            "./images/R_Idle.png",
            "./images/R_Attack.png"
        ];

        let playerSprite = document.getElementById("playerOneSprite");
        // function we will call in setTimeout, before the frames change back
        // the idle stance
        // in other words, we set to the attack sprite, wait 3 seconds,
        // then set it back to the idle sprite
        playerSprite.src = playerOneFrames[1];

        // removes the 'idle' class from the player sprite
        playerSprite.classList.remove("idle");
        // adds the 'attack' class to the player sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        playerSprite.classList.add("attack");

        // grabs the enemy sprite
        let enemySprite = document.getElementById("playerTwoSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        enemySprite.classList.add("damage");

        enemyDamage.currentTime = 0;

        // sound that plays when enemy takes damage
        enemyDamage.play();

        // the function we will call in the setTimeOut method below
        // after 350 milliseconds
        // this function will execute this block of code
        function changePlayerOneSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerOneFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerOneSprite, 350);
    }

    // for easy reading,
    // we do not include ALL of the above code within this condition
    // instead, we create higher-order functions to keep the code neat and readable
    if (gameState.whoseTurn === 1) {
        animatePlayer();
        changeButtonStatus();
        changePlayer();
    }
}

// function that allows the player one attack button to reduce the player's two health
function attackPlayerOne() {

    // function that will activate player's one button and disable player's two button
    function changeButtonStatus() {
        // grab player's one button
        let playerOneAttackButton = document.getElementById("playerOneAttack");
        // disable player's one button
        playerOneAttackButton.disabled = true;
        // add inactive class to player's one button
        playerOneAttackButton.classList.add("inactive");
        // remove active class to player's one button
        playerOneAttackButton.classList.remove("active");

        // grab player's two button
        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
        // activate player's two button
        playerTwoAttackButton.disabled = false;
        // add active class to player's two button
        playerTwoAttackButton.classList.add("active");
        // remove inactive class to player's two button
        playerTwoAttackButton.classList.remove("inactive");
    }

    // function that changes players 2's sprite using the array containing multiple images
    function animatePlayer() {
        // array containing the images used in player two's animation (idle stance & attack stance)
        let playerTwoFrames = [
            './images/L_Idle.png',
            './images/L_Attack.png'
        ];

        // grab player two's sprite
        let playerSprite = document.getElementById("playerTwoSprite");
        // set image source to attacking stance image
        playerSprite.src = playerTwoFrames[1];
        // remove idle class from player two's sprite
        playerSprite.classList.remove("idle");
        // add attack class to player two's sprite
        playerSprite.classList.add("attack");

        // grab the enemy sprite
        let enemySprite = document.getElementById("playerOneSprite");
        // grab audio 
        let enemyDamage = document.getElementById("SFX_PlayerDamage");

        // remove idle class from enemy sprite
        enemySprite.classList.remove("idle");
        // add damage class to enemy sprite
        enemySprite.classList.add("damage");
        // reset audio time, to prevent no sound playing during overlap
        enemyDamage.currentTime = 0;
        // sound that plays when enemy takes damage
        enemyDamage.play();

        // function that we be called slightly later (350ms)
        // to remove/add classes to enemy and player sprites
        function changePlayerTwoSprite() {
            // remove damage class from enemy sprite
            enemySprite.classList.remove("damage");
            // add idle class to enemy sprite
            enemySprite.classList.add("idle");

            // set player sprite to idle image
            playerSprite.src = playerTwoFrames[0];
            // remove attack class from player sprite
            playerSprite.classList.remove("attack");
            // add idle class to player sprite
            playerSprite.classList.add("idle");
        }

        // call the changePlayerTwoSprite function in 350ms
        setTimeout(changePlayerTwoSprite, 350);
    }

    // checks that it is player 2's turn
    if (gameState.whoseTurn === 2) {
        // animates player 2's sprite 
        animatePlayer();
        // activates player 1's button and disables player 2's button
        changeButtonStatus();
        // function that considers which player's turn it is and updates the UI
        changePlayer();
    }
}