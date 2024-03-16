export const Square = ({ children, updateBoard, isSelected, index }) => {
  const onClickSquare = () => {
    updateBoard(index);
  };

  return (
    <div className={`square ${isSelected ? 'selected' : ''}`} key={index} onClick={onClickSquare}>
      {children}
    </div>
  );
};
