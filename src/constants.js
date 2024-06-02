export const SQUARE_COORDINATES = [
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

export const START_COORDINATES_BOTTOM = ['A13', 'G11', 'K13', 'G7', 'I11', 'H8', 'H10', 'H12', 'D14', 'D16'];
export const START_COORDINATES_TOP = ['Q13', 'P12', 'P14', 'O11', 'O13', 'O15', 'N10', 'N12', 'N14', 'N16'];
export const START_COORDINATES_TOP_LEFT = ['M1', 'M3', 'M5', 'M7', 'L2', 'L4', 'L6', 'K3', 'K5', 'J4'];
export const START_COORDINATES_TOP_RIGHT = ['M19', 'M21', 'M23', 'M25', 'L20', 'L22', 'L24', 'K21', 'K23', 'J22'];
export const START_COORDINATES_BOTTOM_LEFT = ['E1', 'E3', 'E5', 'E7', 'F2', 'F4', 'F6', 'G3', 'G5', 'H4'];
export const START_COORDINATES_BOTTOM_RIGHT = ['E19', 'E21', 'E23', 'E25', 'F20', 'F22', 'F24', 'G21', 'G23', 'H22'];

export const PLAYERS = ['red', 'blue', 'green', 'yellow', 'purple', 'white'];

export const INITIAL_BOARD_STATE = {};
SQUARE_COORDINATES.forEach((sq) => {
  const squareObj = {
    marbleColor: null,
  }
  INITIAL_BOARD_STATE[sq] = squareObj;
});
[
  START_COORDINATES_BOTTOM,
  START_COORDINATES_TOP,
  START_COORDINATES_TOP_LEFT,
  START_COORDINATES_TOP_RIGHT,
  START_COORDINATES_BOTTOM_LEFT,
  START_COORDINATES_BOTTOM_RIGHT,
].forEach((coordinateList, index) => {
  coordinateList.forEach(c => INITIAL_BOARD_STATE[c].marbleColor = PLAYERS[index]);
})
