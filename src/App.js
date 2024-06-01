import { useState } from 'react';
// import getLegalMoves from './utils/getLegalMoves.js';
import Square from './Square.js';
import {
  SQUARES,
  BOTTOM_PLAYER_START_COORDINATES,
  TOP_PLAYER_START_COORDINATES,
  TOP_LEFT_PLAYER_START_COORDINATES,
  TOP_RIGHT_PLAYER_START_COORDINATES,
  BOTTOM_LEFT_PLAYER_START_COORDINATES,
  BOTTOM_RIGHT_PLAYER_START_COORDINATES,
} from './constants.js';

import './App.css';

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
    coordinateList.forEach(c => SQUARES[c].marbleColor = PLAYERS[inde]);
  })

  function handleSquareClick(squareIdentifier) {
    const squareObj = SQUARES[squareIdentifier];

    if (whoseTurn === squareObj?.marbleColor) {
      if (squareIdentifier === selectedSquare) {
        setSelectedSquare(null); // deselect
      } else {
        setSelectedSquare(squareIdentifier);
      }
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
                selectedSquare={selectedSquare} // TODO: introduce state handling, e.g. React Context
                handleSquareClick={handleSquareClick}
                squareIdentifier={String.fromCharCode('Q'.charCodeAt(0) - squareLetter) + (squareNumber + 1)}
              />
            ))}
        </div>))}
    </div>
  );
}

export default App;
