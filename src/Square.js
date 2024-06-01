import { SQUARES } from './constants';
import getLegalMoves from './utils/getLegalMoves';

 // TODO: get selectedSquare from a state tree, e.g. a React Context
export default function Square({ handleSquareClick, clickedSquareIdentifier, selectedSquare }) {
  const isSelected = clickedSquareIdentifier === selectedSquare;
  const squareObj = SQUARES[clickedSquareIdentifier];
  const isBoardSquare = Object.keys(SQUARES).includes(clickedSquareIdentifier);
  let className = "Square";
  if (isBoardSquare) className += " BoardSquare";
  if (isSelected) className += " SelectedSquare";
  if (squareObj && squareObj.marbleColor !== null) className += ` SquareColor--${squareObj.marbleColor}`;

  const legalMoves = getLegalMoves({ selectedSquare });

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
