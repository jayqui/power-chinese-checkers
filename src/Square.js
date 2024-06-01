import { SQUARES } from './constants';
import getLegalMoves from './utils/getLegalMoves';

 // TODO: get selectedSquare from a state tree, e.g. a React Context
export default function Square({ handleSquareClick, squareIdentifier, selectedSquare }) {
  const isSelected = squareIdentifier === selectedSquare;
  const squareObj = SQUARES[squareIdentifier];
  const isBoardSquare = Object.keys(SQUARES).includes(squareIdentifier);
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
