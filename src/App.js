import { useState } from 'react';

import './App.css';

const squares = {};
const squareCoordinates = [
  "A13",
  "B12", "B14",
  "C11", "C13", "C15",
  "D10", "D12", "D14", "D16",
  "E1", "E3", "E5", "E7", "E9", "E11", "E13", "E15", "E17", "E19", "E21", "E23", "E25",
  "F2", "F4", "F6", "F8", "F10", "F12", "F14", "F16", "F18", "F20", "F22", "F24",
  "G3", "G5", "G7", "G9", "G11", "G13", "G15", "G17", "G19", "G21", "G23",
  "H4", "H6", "H8", "H10", "H12", "H14", "H16", "H18", "H20", "H22",
  "I5", "I7", "I9", "I11", "I13", "I15", "I17", "I19", "I21",
  "J4", "J6", "J8", "J10", "J12", "J14", "J16", "J18", "J20", "J22",
  "K3", "K5", "K7", "K9", "K11", "K13", "K15", "K17", "K19", "K21", "K23",
  "L2", "L4", "L6", "L8", "L10", "L12", "L14", "L16", "L18", "L20", "L22", "L24",
  "M1", "M3", "M5", "M7", "M9", "M11", "M13", "M15", "M17", "M19", "M21", "M23", "M25",
  "N10", "N12", "N14", "N16",
  "O11", "O13", "O15",
  "P12", "P14",
  "Q13",
]
squareCoordinates.forEach((sq) => {
  const squareObj = {
    marbleColor: null,
    neighbors: [],
  }

  const letter = sq[0];
  const prevLetter = String.fromCharCode(letter.charCodeAt(0) - 1);
  const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
  const number = Number(sq.slice(1));
  const prevNumber = number - 1;
  const nextNumber = number + 1;

  if (squareCoordinates.includes(prevLetter + prevNumber)) { squareObj.neighbors.push(prevLetter + prevNumber) }
  if (squareCoordinates.includes(prevLetter + nextNumber)) { squareObj.neighbors.push(prevLetter + nextNumber) }
  if (squareCoordinates.includes(letter + (number - 2))) { squareObj.neighbors.push(letter + (number - 2)) }
  if (squareCoordinates.includes(letter + (number + 2))) { squareObj.neighbors.push(letter + (number + 2)) }
  if (squareCoordinates.includes(nextLetter + prevNumber)) { squareObj.neighbors.push(nextLetter + prevNumber) }
  if (squareCoordinates.includes(nextLetter + nextNumber)) { squareObj.neighbors.push(nextLetter + nextNumber) }

  squares[sq] = squareObj;
});

function App() {
  const [selectedSquare, setSelectedSquare] = useState(null);

  function handleSquareClick(squareIdentifier) {
    if (squareCoordinates.includes(squareIdentifier)) {
      setSelectedSquare(squareIdentifier);
      console.log('squares[squareIdentifier].neighbors', squares[squareIdentifier].neighbors);
    }
  }

  return (
    <div className="App">
      {[...Array(17).keys()].map((squareLetter) =>
        (<div className="Row" key={squareLetter}>
            {[...Array(25).keys()].map((squareNumber) => (
              <Square
                key={squareNumber}
                selectedSquare={selectedSquare} // TODO: introduce state handling, e.g. React Context
                handleSquareClick={handleSquareClick}
                squareIdentifier={String.fromCharCode('Q'.charCodeAt(0) - squareLetter) + (squareNumber + 1)}
              />
            ))}
        </div>))}
    </div>
  );
}

function Square({ handleSquareClick, squareIdentifier, selectedSquare }) {
  const isBoardSquare = Object.keys(squares).includes(squareIdentifier);
  let className = "Square";
  if (isBoardSquare) className += " BoardSquare";
  if (squareIdentifier === selectedSquare) className += " SelectedSquare";

  return(
    <span
      onClick={() => handleSquareClick(squareIdentifier)}
      className={className}
    >
      {isBoardSquare && squareIdentifier}
    </span>
  )
}

export default App;
