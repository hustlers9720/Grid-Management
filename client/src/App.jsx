import React, { useState } from "react";

export default function App() {
  const size = 3;
  const [matrix, setMatrix] = useState(Array(size).fill().map(() => Array(size).fill("white")));
  const [clickOrder, setClickOrder] = useState([]);
  const [isFull, setIsFull] = useState(false);
  
  const handleClick = (row, col) => {
    if (matrix[row][col] !== "white") return;

    const newMatrix = matrix.map(rowArr => [...rowArr]);
    newMatrix[row][col] = "green";
    setMatrix(newMatrix);

    const newOrder = [...clickOrder, { row, col }];
    setClickOrder(newOrder);

    if (newOrder.length === size * size) {
      setIsFull(true);
      changeToOrange(newOrder);
    }
  };

  const changeToOrange = (order) => {
    order.forEach((cell, index) => {
      setTimeout(() => {
        setMatrix(prevMatrix => {
          const updatedMatrix = prevMatrix.map(rowArr => [...rowArr]);
          updatedMatrix[cell.row][cell.col] = `${index + 1}`;
          return updatedMatrix;
        });
      }, (index + 1) * 500);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-green-400 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-6">{isFull ? "Grid Fully Covered" : "Click Sequence Grid"}</h1>
      <div className="grid grid-cols-3 p-2 w-60 h-60 border-4 border-blue-700 shadow-2xl rounded-lg bg-gray-800">{/* Tailwind grid layout */}
        {matrix.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-20 h-20 flex items-center justify-center cursor-pointer text-2xl font-bold transition-colors duration-300 border border-gray-700 ${color === 'white' ? 'bg-gray-200' : color === 'green' ? 'bg-green-500' : 'bg-orange-500'}`}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {isNaN(color) ? "" : color}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
