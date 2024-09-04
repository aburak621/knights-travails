const adjacencyList = [];
const moveset = [[2, 1], [1, 2], [2, -1], [1, -2], [-2, -1], [-1, -2], [-2, 1], [-1, 2]];

for (let x = 0; x < 8; x++) {
  adjacencyList.push([]);
  for (let y = 0; y < 8; y++) {
    adjacencyList[x].push([]);
    moveset.forEach(move => {
      const xMove = move[0];
      const yMove = move[1];

      if (x + xMove < 8 &&
        x + xMove >= 0 &&
        y + yMove < 8 &&
        y + yMove >= 0) {
        adjacencyList[x][y].push([x + xMove, y + yMove]);
      }
    });
  }
}

function knightMoves(start, end) {
  const queue = [];
  const pathMap = new Map();

  queue.push(start);
  pathMap.set(start.toString(), null);

  while (queue.length !== 0) {
    const currentMove = queue.shift();

    if (currentMove[0] === end[0] && currentMove[1] === end[1]) {
      const path = [];
      let step = currentMove;
      while (step) {
        path.unshift(step);
        step = pathMap.get(step.toString());
      }
      return path;
    }

    adjacencyList[currentMove[0]][currentMove[1]].forEach(legalMove => {
      if (!pathMap.has(legalMove.toString())) {
        queue.push(legalMove);
        pathMap.set(legalMove.toString(), currentMove);
      }
    });
  }

  return null;
}

console.log(knightMoves([0, 0], [7, 7]));