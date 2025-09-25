const choices = ['rock', 'paper', 'scissors'];
const playerDisplay = document.getElementById('userDisplay');
const computerDisplay = document.getElementById('comDisplay');
const resultDisplay = document.getElementById('resultDisplay');

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    playerDisplay.textContent = `Player: ${playerChoice}`;
    computerDisplay.textContent = `Computer: ${computerChoice}`;

    if (playerChoice === computerChoice) {
        resultDisplay.textContent = "It's a TIE!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultDisplay.textContent = "You WIN!";
    } else {
        resultDisplay.textContent = "You LOSE!";
    }
}