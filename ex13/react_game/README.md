# ex13 - React OX遊戲

Web Programming Spring 2026 - ex#13

## 專案結構

```
react_game/
├── public/
│   └── index.html
├── src/
│   ├── index.js      ← 主程式（Square, Board, Game 元件）
│   └── index.css     ← 樣式
├── .gitignore
├── package.json
└── README.md
```

## 元件架構

- **Square** (functional component)：單一格子按鈕
- **Board** (class component)：3x3 棋盤，renderSquare(i) 渲染每格
- **Game** (class component)：遊戲主體，管理 state（history, stepNumber, xIsNext）
- **calculateWinner(squares)**：判斷勝負

## 啟動方式

```bash
npm install
npm start
```

## 功能

- 兩人輪流點擊下棋（X / O）
- 自動判斷勝負
- 支援查看歷史步驟並回到任意一步
