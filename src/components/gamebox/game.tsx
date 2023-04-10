import React from "react";
import "./game.css";
function Game() {
  const Players = JSON.parse(sessionStorage.getItem("Players") || "{}");
  const [gameStatus, setgameStatus] = React.useState("visible");

  let [winner, showwinner] = React.useState({
    player: "",
    color: "rgb(6, 158, 59)",
  });
  const [current, setnext] = React.useState(false);
  const [currentPlayer, setPayer] = React.useState({
    name: "X",
    color: "rgb(6, 158, 59)",
  });

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
    active: true,
  });

  function handlebox(e: any) {
    if (winner.player === "") {
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
        e.currentTarget.disabled = box.active;
        e.currentTarget.querySelector("h2").style.color = "rgb(6, 158, 59)";
        setPayer((prev) => ({
          ...prev,
          name: "O",
          color: "rgb(248, 13, 111)",
        }));
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
        e.currentTarget.disabled = box.active;
        e.currentTarget.querySelector("h2").style.color = "rgb(248, 13, 111)";
        setPayer((prev) => ({
          ...prev,
          name: "  X",
          color: "rgb(6, 158, 59)",
        }));
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
        if (a === "X") {
          showwinner({
            player: `${a} Wins!!`,
            color: "rgb(6, 158, 59)",
          });
          setgameStatus("hidden");
        } else if (a === "O") {
          showwinner({
            player: `${a} Wins!!`,
            color: "rgb(248, 13, 111)",
          });
          setgameStatus("hidden");
        }
        return `${a} wins`;
      } else if (count === 9 && winner.player === "") {
        showwinner({
          player: "Match Drawn",
          color: "yellow",
        });
        return `Match drawn`;
      }
    }
  }

  React.useEffect(() => {
    method();
  });
  React.useEffect(() => {
    if(box.active===false){
      console.log(box);
      let elems=document.getElementsByTagName('button')
      for(let i = 0; i < elems.length; i++){
        elems[i].disabled = false;
    }

    }
  });
  const reset = (e: any) => {
    showwinner(({
      player:"",
      color:""
    }))
    setBox((prev) => ({
      ...prev,
      active: false,
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
    }));
    showwinner(({
      player:"",
      color:""
    }))
  };
  return (
    <div className="main-outer">
      <div className="players dccr">
        <div className="player1">
          <h1 style={{ color: "white" }}>{Players.player1}</h1>
        </div>
        <img src={require("./vs.png")} alt="" />
        <div className="player1">
          <h1 style={{ color: "white" }}>{Players.player2}</h1>
        </div>
      </div>
      <div className="content">
        <div className="dcc">
          <h1 className={`${gameStatus}`}>
            Player-
            <span style={{ color: `${currentPlayer.color}` }}>
              {currentPlayer.name}
            </span>
            's play
          </h1>
        </div>
        <div className="outer">
          <div className="main">
            <button
              className="box"
              id="1"
              key={1}
              onClick={(e) => handlebox(e)}
            >
              <h2> {box[1]}</h2>
            </button>
            <button
              className="box"
              id="4"
              key={2}
              onClick={(e) => handlebox(e)}
            >
              <h2>{box[4]}</h2>
            </button>
            <button
              className="box"
              id="7"
              key={3}
              onClick={(e) => handlebox(e)}
            >
              <h2>{box[7]}</h2>
            </button>
          </div>
          <div className="main">
            <button
              className="box"
              id="2"
              key={3}
              onClick={(e) => handlebox(e)}
            >
              <h2>{box[2]}</h2>
            </button>
            <button
              className="box"
              id="5"
              key={4}
              onClick={(e) => handlebox(e)}
            >
              <h2>{box[5]}</h2>
            </button>
            <button
              className="box"
              id="8"
              key={5}
              onClick={(e) => handlebox(e)}
            >
              <h2> {box[8]}</h2>
            </button>
          </div>
          <div className="main">
            <button
              className="box"
              id="3"
              key={6}
              onClick={(e) => handlebox(e)}
            >
              <h2>{box[3]}</h2>
            </button>
            <button
              className="box"
              id="6"
              key={7}
              onClick={(e) => handlebox(e)}
            >
              <h2>{box[6]}</h2>
            </button>
            <button
              className="box"
              id="9"
              key={8}
              onClick={(e) => handlebox(e)}
            >
              <h2>{box[9]}</h2>
            </button>
          </div>
        </div>
        <div className="winner dcc">
          <h1 style={{ color: `${winner.color}` }}>{winner.player}</h1>
          <button id="reset" onClick={(e) => reset(e)}>
            <h2>Re-Match</h2>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Game;
