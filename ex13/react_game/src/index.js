import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// ========================================
// Square 元件：單一格子 (functional component)
// ========================================
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// ========================================
// Board 元件：棋盤 (class component)
// ========================================
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// ========================================
// Game 元件：遊戲主體 (class component)
// ========================================
class Game extends React.Component {
  constructor(props) {
    super(props);
    // 紀錄每一步的歷史狀態
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,  // 目前在第幾步
      xIsNext: true   // 下一步是不是 X
    };
  }

  // 處理點擊事件
  handleClick(i) {
    // 只保留到目前這步的歷史（支援回到過去後繼續走）
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // 複製一份，不直接修改

    // 如果已經有贏家，或這格已經填了，就不做事
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // 填入 X 或 O
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  // 跳到某一步
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0  // 偶數步輪到 X
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // 產生每一步的按鈕
    const moves = history.map((step, move) => {
      const desc = move ?
        '回到 #' + move + ' 步' :
        '遊戲開始';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    // 顯示目前遊戲狀態
    let status;
    if (winner) {
      status = '贏家是：' + winner;
    } else {
      status = '下一位玩家：' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
// 計算勝負的 function
// ========================================
function calculateWinner(squares) {
  // 所有可能獲勝的組合（橫、直、斜）
  const lines = [
    [0, 1, 2],  // 第一橫排
    [3, 4, 5],  // 第二橫排
    [6, 7, 8],  // 第三橫排
    [0, 3, 6],  // 第一直排
    [1, 4, 7],  // 第二直排
    [2, 5, 8],  // 第三直排
    [0, 4, 8],  // 左斜
    [2, 4, 6]   // 右斜
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 回傳贏家 'X' 或 'O'
    }
  }
  return null; // 沒有贏家
}

// ========================================
// React 進入點
// ========================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
