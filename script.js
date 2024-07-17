## script.js

```javascript
const imageSrc = "https://m.media-amazon.com/images/I/61WMEaaLxxL._AC_SL1500_.jpg";
const puzzleSize = 3;
let pieces = Array.from({length: puzzleSize * puzzleSize}, (_, i) => i);
let isComplete = false;

function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    renderPuzzle();
    checkCompletion();
}

function renderPuzzle() {
    const puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = '';
    puzzleContainer.style.gridTemplateColumns = `repeat(${puzzleSize}, 100px)`;

    pieces.forEach((piece, index) => {
        const pieceElement = document.createElement('div');
        pieceElement.style.width = '100px';
        pieceElement.style.height = '100px';
        pieceElement.style.border = '1px solid gray';
        pieceElement.style.cursor = 'pointer';

        if (piece !== puzzleSize * puzzleSize - 1) {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.style.objectFit = 'cover';
            img.style.width = '300px';
            img.style.height = '300px';
            img.style.objectPosition = `-${(piece % puzzleSize) * 100}px -${Math.floor(piece / puzzleSize) * 100}px`;
            pieceElement.appendChild(img);
        }

        pieceElement.addEventListener('click', () => handlePieceClick(index));
        puzzleContainer.appendChild(pieceElement);
    });
}

function handlePieceClick(index) {
    if (isComplete) return;

    const emptyIndex = pieces.indexOf(puzzleSize * puzzleSize - 1);
    if (
        (index === emptyIndex - 1 && index % puzzleSize !== puzzleSize - 1) ||
        (index === emptyIndex + 1 && index % puzzleSize !== 0) ||
        index === emptyIndex - puzzleSize ||
        index === emptyIndex + puzzleSize
    ) {
        [pieces[index], pieces[emptyIndex]] = [pieces[emptyIndex], pieces[index]];
        renderPuzzle();
        checkCompletion();
    }
}

function checkCompletion() {
    isComplete = pieces.every((piece, index) => piece === index);
    if (isComplete) {
        alert('퍼즐을 완성했습니다!');
    }
}

window.addEventListener('load', () => {
    renderPuzzle();
    document.getElementById('shuffle-button').addEventListener('click', shufflePieces);
});
```
