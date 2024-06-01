import { SQUARES, SQUARE_COORDINATES } from '../constants';

export default function getLegalMoves({ selectedSquare }) {
  if (!selectedSquare) return [];

  const legalMoves = [];

  const letter = selectedSquare[0];
  const number = Number(selectedSquare.slice(1));

  const squareFinderPrinciples = [
    { letter: 0, number: -2 }, // left
    { letter: 0, number: 2 }, // right
    { letter: -1, number: -1 }, // left backward
    { letter: -1, number: 1 }, // right backward
    { letter: 1, number: -1 }, // left forward
    { letter: 1, number: 1 }, // right forward
  ];

  const letterFinderFunc = (n) => String.fromCharCode(letter.charCodeAt(0) + n);
  const numberFinderFunc = (n) => number + n;

  squareFinderPrinciples.forEach((principle) => {
    let letterShift = principle.letter;
    let numberShift = principle.number;
    let candidateSquare = letterFinderFunc(letterShift) + numberFinderFunc(numberShift);

    const isOnBoard = (square) => SQUARE_COORDINATES.includes(square);
    const isEmpty = (square) => SQUARES[square].marbleColor === null;
    const isEmptyBoardSquare = (square) => isOnBoard(square) && isEmpty(square);

    if (isEmptyBoardSquare(candidateSquare)) {
      legalMoves.push(candidateSquare)
    } else {
      letterShift += principle.letter;
      numberShift += principle.number;
      candidateSquare = letterFinderFunc(letterShift) + numberFinderFunc(numberShift);

      if (isEmptyBoardSquare(candidateSquare)) {
        legalMoves.push(candidateSquare)
      }
    };
  });

  return legalMoves;
}
