import {WINNING_COMBINATIONS} from './constants';

export const evaluate = (playerMoves: number[], cpuMoves: number[]): number => {
  for (let combination of WINNING_COMBINATIONS) {
    if (combination.every(val => playerMoves.includes(val))) {
      return -10;
    } else if (combination.every(val => cpuMoves.includes(val))) {
      return 10;
    }
  }
  return 0;
};

const minimax = (
  board: number[],
  depth: number,
  isMaximizingPlayer: boolean,
  playerMoves: number[],
  cpuMoves: number[],
): number => {
  let score = evaluate(playerMoves, cpuMoves);

  if (Math.abs(score) === 10 || board.length === 0 || depth >= 9) {
    return score;
  }

  if (isMaximizingPlayer) {
    let best = -Infinity;
    for (let i = 1; i <= 9; i++) {
      if (!playerMoves.includes(i) && !cpuMoves.includes(i)) {
        let newCpuMoves = [...cpuMoves, i];
        best = Math.max(
          best,
          minimax(
            board.filter(val => val !== i),
            depth + 1,
            false,
            playerMoves,
            newCpuMoves,
          ),
        );
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 1; i <= 9; i++) {
      if (!playerMoves.includes(i) && !cpuMoves.includes(i)) {
        let newPlayerMoves = [...playerMoves, i];
        best = Math.min(
          best,
          minimax(
            board.filter(val => val !== i),
            depth + 1,
            true,
            newPlayerMoves,
            cpuMoves,
          ),
        );
      }
    }
    return best;
  }
};

export const findBestMove = (
  board: number[],
  playerMoves: number[],
  cpuMoves: number[],
): number => {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 1; i <= 9; i++) {
    if (!playerMoves.includes(i) && !cpuMoves.includes(i)) {
      let newCpuMoves = [...cpuMoves, i];
      let moveVal = minimax(
        board.filter(val => val !== i),
        0,
        false,
        playerMoves,
        newCpuMoves,
      );

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
};
