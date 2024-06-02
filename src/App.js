import { useState } from 'react';
import getLegalMoves, { isEmptyBoardSquare } from './utils/getLegalMoves.js';
import Square from './Square.js';
import {
  PLAYERS,
  INITIAL_BOARD_STATE,
} from './constants.js';

import './App.css';

function App() {
  // TODO: allow to be dynamically set as part of intro/setup sequence
  const [whoseTurn, setWhoseTurn] = useState(PLAYERS[0]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [boardState, setBoardState] = useState(INITIAL_BOARD_STATE)

  function handleSquareClick(clickedSquareIdentifier) {
    const squareObj = boardState[clickedSquareIdentifier];

    // set/unset selected square
    if (whoseTurn === squareObj?.marbleColor) {
      if (clickedSquareIdentifier === selectedSquare) {
        setSelectedSquare(null); // deselect
      } else {
        setSelectedSquare(clickedSquareIdentifier);
      }
    }

    // move marble
    const legalMoves = getLegalMoves({ selectedSquare, boardState });
    if (isEmptyBoardSquare(clickedSquareIdentifier, boardState) && legalMoves.includes(clickedSquareIdentifier)) {
      console.log("legal move selected!", clickedSquareIdentifier)
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
                boardState={boardState}
                selectedSquare={selectedSquare} // TODO: introduce state handling, e.g. React Context
                handleSquareClick={handleSquareClick}
                clickedSquareIdentifier={String.fromCharCode('Q'.charCodeAt(0) - squareLetter) + (squareNumber + 1)}
              />
            ))}
        </div>))}
    </div>
  );
}

export default App;
