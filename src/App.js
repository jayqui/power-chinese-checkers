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
  }
  squares[sq] = squareObj;
});


const BOTTOM_PLAYER_START_COORDINATES = ['A13', 'G11', 'G9', 'C11', 'C13', 'H8', 'H10', 'H12', 'D14', 'D16'];
const TOP_PLAYER_START_COORDINATES = ['Q13', 'P12', 'P14', 'O11', 'O13', 'O15', 'N10', 'N12', 'N14', 'N16'];
const TOP_LEFT_PLAYER_START_COORDINATES = ['M1', 'M3', 'M5', 'M7', 'L2', 'L4', 'L6', 'K3', 'K5', 'J4']
const TOP_RIGHT_PLAYER_START_COORDINATES = ['M19', 'M21', 'M23', 'M25', 'L20', 'L22', 'L24', 'K21', 'K23', 'J22']
const BOTTOM_LEFT_PLAYER_START_COORDINATES = ['E1', 'E3', 'E5', 'E7', 'F2', 'F4', 'F6', 'G3', 'G5', 'H4']
const BOTTOM_RIGHT_PLAYER_START_COORDINATES = ['E19', 'E21', 'E23', 'E25', 'F20', 'F22', 'F24', 'G21', 'G23', 'H22']

function App() {
  // TODO: allow to be dynamically set as part of intro/setup sequence
  const PLAYERS = ['red', 'blue', 'green', 'yellow', 'purple', 'white'];
  const [whoseTurn, setWhoseTurn] = useState(PLAYERS[0]);
  const [selectedSquare, setSelectedSquare] = useState(null);

  [
    BOTTOM_PLAYER_START_COORDINATES,
    TOP_PLAYER_START_COORDINATES,
    TOP_LEFT_PLAYER_START_COORDINATES,
    TOP_RIGHT_PLAYER_START_COORDINATES,
    BOTTOM_LEFT_PLAYER_START_COORDINATES,
    BOTTOM_RIGHT_PLAYER_START_COORDINATES,
  ].forEach((coordinateList, inde) => {
    coordinateList.forEach(c => squares[c].marbleColor = PLAYERS[inde]);
  })

  function handleSquareClick(squareIdentifier) {
    const squareObj = squares[squareIdentifier];

    if (whoseTurn === squareObj?.marbleColor) {
      setSelectedSquare(squareIdentifier);
    }
  }

  return (
    <div className="App">
      <div className={`WhoseTurnBox SquareColor--${whoseTurn}`}>
        {whoseTurn}'s turn!
      </div>
      {[...Array(17).keys()].map((squareLetter) =>
        (<div className="Row" key={squareLetter}>
            {[...Array(25).keys()].map((squareNumber) => (
              <Square
                key={squareNumber}
                selectedSquare={selectedSquare} // TODO: introduce state handling, e.g. React Contet
                handleSquareClick={handleSquareClick}
                squareIdentifier={String.fromCharCode('Q'.charCodeAt(0) - squareLetter) + (squareNumber + 1)}
              />
            ))}
        </div>))}
    </div>
  );
}

// TODO: get selectedSquare from a state tree, e.g. a React Contet
function getLegalMoves({ selectedSquare }) {
  if (!selectedSquare) return [];

  const legalMoves = [];

  const letter = selectedSquare[0];
  const number = Number(selectedSquare.slice(1));

  const addToLegalMovesIfApplicable = (candidateSquare) => {
    if (squareCoordinates.includes(candidateSquare)) {
      let shouldInclude = false;
      if (squares[candidateSquare].marbleColor === null) shouldInclude = true;
      if (shouldInclude === true)legalMoves.push(candidateSquare);
    }
  }

  // Left
  const leftCandidate = letter + (number - 2);
  addToLegalMovesIfApplicable(leftCandidate);
  // Right
  const rightCandidate = letter + (number + 2);
  addToLegalMovesIfApplicable(rightCandidate);
  // Left Backward
  const prevLetter = String.fromCharCode(letter.charCodeAt(0) - 1);
  const leftBackwardCandidate = prevLetter + (number - 1);
  addToLegalMovesIfApplicable(leftBackwardCandidate);
  // Right Backward
  const rightBackwardCandidate = prevLetter + (number + 1);
  addToLegalMovesIfApplicable(rightBackwardCandidate);
  // Left Forward
  const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
  const leftForwardCandidate = nextLetter + (number - 1);
  addToLegalMovesIfApplicable(leftForwardCandidate);

  // Right Forward
  const rightForwardCandidate = nextLetter + (number + 1);
  addToLegalMovesIfApplicable(rightForwardCandidate);

  return legalMoves;
}

 // TODO: get selectedSquare from a state tree, e.g. a React Contet
function Square({ handleSquareClick, squareIdentifier, selectedSquare }) {
  const isSelected = squareIdentifier === selectedSquare;
  const squareObj = squares[squareIdentifier];
  const isBoardSquare = Object.keys(squares).includes(squareIdentifier);
  let className = "Square";
  if (isBoardSquare) className += " BoardSquare";
  if (isSelected) className += " SelectedSquare";
  if (squareObj && squareObj.marbleColor !== null) className += ` SquareColor--${squareObj.marbleColor}`;

  const legalMoves = getLegalMoves({ selectedSquare });

  if (legalMoves.includes(squareIdentifier)) className += " LegalMove";

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
