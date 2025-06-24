// cube.js

class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      F: Array(9).fill('g'),
      B: Array(9).fill('b'),
      L: Array(9).fill('o'),
      R: Array(9).fill('r')
    };
    this.moveHistory = [];
  }

  getColorString() {
    return (
      this.faces.U.join('') +
      this.faces.R.join('') +
      this.faces.F.join('') +
      this.faces.D.join('') +
      this.faces.L.join('') +
      this.faces.B.join('')
    );
  }

  reset() {
    this.faces.U.fill('w');
    this.faces.D.fill('y');
    this.faces.F.fill('g');
    this.faces.B.fill('b');
    this.faces.L.fill('o');
    this.faces.R.fill('r');
    this.moveHistory = [];
    renderCube();
  }

  rotateFaceClockwise(face) {
    return [
      face[6], face[3], face[0],
      face[7], face[4], face[1],
      face[8], face[5], face[2],
    ];
  }

  rotateRight() {
    this.faces.R = this.rotateFaceClockwise(this.faces.R);

    const { U, F, D, B } = this.faces;
    const u = [U[2], U[5], U[8]];
    const f = [F[2], F[5], F[8]];
    const d = [D[2], D[5], D[8]];
    const b = [B[6], B[3], B[0]];

    U[2] = b[0]; U[5] = b[1]; U[8] = b[2];
    F[2] = u[0]; F[5] = u[1]; F[8] = u[2];
    D[2] = f[0]; D[5] = f[1]; D[8] = f[2];
    B[6] = d[2]; B[3] = d[1]; B[0] = d[0];

    this.moveHistory.push('R');
    renderCube();
  }

  rotateUp() {
    this.faces.U = this.rotateFaceClockwise(this.faces.U);
    this.moveHistory.push('U');
    renderCube();
  }

  rotateFront() {
    this.faces.F = this.rotateFaceClockwise(this.faces.F);
    this.moveHistory.push('F');
    renderCube();
  }

  rotateLeft() {
    this.faces.L = this.rotateFaceClockwise(this.faces.L);
    this.moveHistory.push('L');
    renderCube();
  }

  rotateDown() {
    this.faces.D = this.rotateFaceClockwise(this.faces.D);
    this.moveHistory.push('D');
    renderCube();
  }

  rotateBack() {
    this.faces.B = this.rotateFaceClockwise(this.faces.B);
    this.moveHistory.push('B');
    renderCube();
  }

  scramble() {
    const moves = ['R', 'U', 'F', 'L', 'D', 'B'];
    const moveCount = 20;

    for (let i = 0; i < moveCount; i++) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      this.performMove(move);
    }
    console.log('Scrambled!');
  }

  performMove(move) {
    switch (move) {
      case 'R': this.rotateRight(); break;
      case 'U': this.rotateUp(); break;
      case 'F': this.rotateFront(); break;
      case 'L': this.rotateLeft(); break;
      case 'D': this.rotateDown(); break;
      case 'B': this.rotateBack(); break;
    }
  }

  solve() {
    const reverseMoves = this.moveHistory.slice().reverse();

    const interval = setInterval(() => {
      if (reverseMoves.length === 0) {
        clearInterval(interval);
        alert("Cube solved!");
        return;
      }

      const move = reverseMoves.shift();
      // Opposite = same move x 3
      this.performMove(move);
      this.performMove(move);
      this.performMove(move);
    }, 300); // Delay to show animation step-by-step
  }
}

const cube = new Cube();

function renderCube() {
  const cubeDisplay = document.getElementById("cube-display");
  const colorString = cube.getColorString();

  const U = colorString.slice(0, 9);
  const R = colorString.slice(9, 18);
  const F = colorString.slice(18, 27);
  const D = colorString.slice(27, 36);
  const L = colorString.slice(36, 45);
  const B = colorString.slice(45, 54);

  cubeDisplay.innerHTML = `
    <pre style="font-size: 18px; line-height: 1.5;">
U: ${U}
R: ${R}
F: ${F}
D: ${D}
L: ${L}
B: ${B}
    </pre>
  `;
}

function rotateRight() {
  cube.rotateRight();
}

function scrambleCube() {
  cube.scramble();
}

function solveCube() {
  cube.solve();
}

function resetCube() {
  cube.reset();
}

renderCube();
