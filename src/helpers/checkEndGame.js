export const checkEndGame = (board) => {
  return board.every((square) => square !== null);
};
