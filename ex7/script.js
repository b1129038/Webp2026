const gameDisplay = document.getElementById('container');
let errorStreak = 0;

const createRandomChars = (len) => {
    let result = '';
    for (let i = 0; i < len; i++) {
        result += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    return result;
};

window.onload = () => {
    gameDisplay.textContent = createRandomChars(3);
};

window.addEventListener("keyup", (event) => {
    const pressedKey = event.key;
    
    if (pressedKey.length !== 1) return;

    const currentText = gameDisplay.textContent;
    const targetChar = currentText.charAt(0);

    if (pressedKey === targetChar) {
        gameDisplay.textContent = currentText.substring(1);
        errorStreak = 0;
    } else {
        gameDisplay.textContent += pressedKey;
        errorStreak++;

        if (errorStreak === 3) {
            gameDisplay.innerHTML += createRandomChars(3); 
            errorStreak = 0;
        }
    }

    gameDisplay.textContent += createRandomChars(Math.floor(Math.random() * 2) + 1);
});