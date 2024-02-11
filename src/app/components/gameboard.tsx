'use client'
import React, { useState } from 'react';
import JSConfetti from 'js-confetti';

const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left col
    [1, 4, 7], // middle col
    [2, 5, 8], // right col
    [0, 4, 8], // diag l-to-r
    [2, 4, 6], // diag r-to-l
];

const Gameboard = () => {
    const [tiles, setTiles] = useState<(null | 'X' | 'O')[]>(Array(9).fill(null));
    const [turn, setTurn] = useState<'X' | 'O'>('X');
    const [gameOver, setGameOver] = useState<boolean>(false);

    const checkWinner = (currentTiles: (null | 'X' | 'O')[]) => {
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                currentTiles[a] &&
                currentTiles[a] === currentTiles[b] &&
                currentTiles[a] === currentTiles[c]
            ) {
                return currentTiles[a];
            }
        }
        return null;
    };

    const isBoardFull = (newTiles: (null | 'X' | 'O')[] ) => {
        console.log()
        return newTiles.every(tile => tile !== null);
      };

      const handleTileClick = (index: number) => {
        if (!gameOver && !tiles[index]) {
          const newTiles = [...tiles];
          newTiles[index] = turn;
          setTiles(newTiles);
    
          const winner = checkWinner(newTiles);
          if (winner) {
            setGameOver(true);
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti({
              emojis: ['🥳', '👏', '🎊', '🎉', winner],
            });
          } else if (isBoardFull(newTiles)) {
            console.log('asdasd')
            setGameOver(true);
          } else {
            setTurn(turn === 'X' ? 'O' : 'X');
          }
        }
      };

    const handleReset = () => {
        setTiles(Array(9).fill(null));
        setTurn('X');
        setGameOver(false);
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl mb-10">Tic Tac Toe</h1>
            <span className="text-2xl mb-4">{gameOver ? `Winner ${turn}` : `${turn}'s turn`}</span>
            <div className="grid grid-cols-3 gap-4">
                {tiles.map((tile, index) => (
                    <button
                        key={index}
                        className="bg-gray-200 rounded w-40 h-40 text-[50px] text-gray-600 font-bold flex items-center justify-center"
                        onClick={() => handleTileClick(index)}
                        disabled={gameOver || tile !== null}
                    >
                        {tile}
                    </button>
                ))}
            </div>
            {gameOver && (
                <button
                    className="mt-6 px-10 py-3 bg-sky-500 text-white rounded"
                    onClick={handleReset}
                >
                    Reset
                </button>
            )}
        </div>
    );
};

export default Gameboard;
