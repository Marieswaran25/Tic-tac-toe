import e from "express";
import React from "react";
import "./game.css";

function Game() {
  const [resetStatus, setresetStatus] = React.useState(false);

  let [winner,showwinner] = React.useState('');
  const [current, setnext] = React.useState(false);
  const [currentPlayer, setPayer] = React.useState("X");

  let [count, userCount] = React.useState(0);
  const [x, xstate]: any = React.useState([]);
  const [y, ystate]: any = React.useState([]);
  const winningcombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [box, setBox] = React.useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  });

  function handlebox(e: any) {
    if(!resetStatus){
      if(winner===''){
        if (!current) {
          let updated = { [e.target.id]: "X" };
          setBox((box) => ({
            ...box,
            ...updated,
          }));
          userCount((count = count + 1));
          setnext(true);
          let xArray = x.push(e.target.id);
          xstate((prev: any) => [...prev, xArray]);
          e.currentTarget.disabled = true;
          e.currentTarget.style.color = "black";
          setPayer("O");
        } else {
          let updated = { [e.target.id]: "O" };
          setBox((box) => ({
            ...box,
            ...updated,
          }));
          userCount((count = count + 1));
          setnext(false);
          let yArray = y.push(e.target.id);
          ystate((prev: any) => [...prev, yArray]);
          e.currentTarget.disabled = true;
          e.currentTarget.style.color = "black";
          setPayer("X");
        }
      }
    }
    
  }

  function method() {
    const output = Object.values(box);
    for (let i = 0; i < winningcombo.length; i++) {
      let win = winningcombo[i];
      const a = output[win[0]];
      const b = output[win[1]];
      const c = output[win[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      } else if (a === b && b === c) {
        showwinner(`${a} wins`)
        return`${a} wins`;
      }
      else if(count===9 &&(( a !== b && b === c)||(a === b && b !== c))){
        showwinner('Match Drawn');
        return`Match drawn`;

      }
    }
  }

  React.useEffect(() => {
    method();
   
  });
  function reset(){
    setresetStatus(true)
  }
  return (
    <div className="main-outer">
      <div className="content">
        <div className="dcc">
          <h1>Player-{currentPlayer}'s play</h1>
        </div>
        <div className="outer">
          <div className="main">
            <button
              className="box"
              id="1"
              key={1}
              onClick={(e) => handlebox(e)}
            >
              {box[1]}
            </button>
            <button
              className="box"
              id="4"
              key={2}
              onClick={(e) => handlebox(e)}
            >
              {box[4]}
            </button>
            <button
              className="box"
              id="7"
              key={3}
              onClick={(e) => handlebox(e)}
            >
              {box[7]}
            </button>
          </div>
          <div className="main">
            <button
              className="box"
              id="2"
              key={3}
              onClick={(e) => handlebox(e)}
            >
              {box[2]}
            </button>
            <button
              className="box"
              id="5"
              key={4}
              onClick={(e) => handlebox(e)}
            >
              {box[5]}
            </button>
            <button
              className="box"
              id="8"
              key={5}
              onClick={(e) => handlebox(e)}
            >
              {box[8]}
            </button>
          </div>
          <div className="main">
            <button
              className="box"
              id="3"
              key={6}
              onClick={(e) => handlebox(e)}
            >
              {box[3]}
            </button>
            <button
              className="box"
              id="6"
              key={7}
              onClick={(e) => handlebox(e)}
            >
              {box[6]}
            </button>
            <button
              className="box"
              id="9"
              key={8}
              onClick={(e) => handlebox(e)}
            >
              {box[9]}
            </button>
          </div>
        </div>
        <div className="winner dcc">
          <h1>{winner}</h1>
          <button id="reset" onClick={e=>reset()}>Reset</button>
        </div>
      </div>
    </div>
  );
}
export default Game;
