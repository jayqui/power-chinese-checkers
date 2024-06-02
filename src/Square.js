import getLegalMoves from './utils/getLegalMoves';

 // TODO: get selectedSquare from a state tree, e.g. a React Context
export default function Square({ boardState, handleSquareClick, clickedSquareIdentifier, selectedSquare }) {
  const isSelected = clickedSquareIdentifier === selectedSquare;
  const squareObj = boardState[clickedSquareIdentifier];
  const isBoardSquare = Object.keys(boardState).includes(clickedSquareIdentifier);
  let className = "Square";
  if (isBoardSquare) className += " BoardSquare";
  if (isSelected) className += " SelectedSquare";
  if (squareObj && squareObj.marbleColor !== null) className += ` SquareColor--${squareObj.marbleColor}`;

  const legalMoves = getLegalMoves({ selectedSquare, boardState });

  if (legalMoves.includes(clickedSquareIdentifier)) className += " LegalMove";

  return(
    <span
      onClick={() => handleSquareClick(clickedSquareIdentifier)}
      className={className}
    >
      {isBoardSquare && clickedSquareIdentifier}
    </span>
  )
}
