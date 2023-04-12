import React from "react";
import { Button } from "react-bootstrap";
import { LoaderFunction, useNavigate } from "react-router-dom";
import "./game.css";
function Game() {
  const navigate = useNavigate();

  const Players = JSON.parse(sessionStorage.getItem("Players") || "{}");
  const [gameStatus, setgameStatus] = React.useState("visible");
  const [resetbtn, managereset] = React.useState(false);
  const [current, setnext] = React.useState(false);
  let [count, userCount] = React.useState(0);
  const [x, xstate]: any = React.useState([]);
  const [y, ystate]: any = React.useState([]);
  let [p1count, setcountp1] = React.useState(0);
  let [p2count, setcountp2] = React.useState(0);

  let [winner, showwinner] = React.useState({
    player: "",
    color: "rgb(6, 158, 59)",
  });
  const [currentPlayer, setPayer] = React.useState({
    name: "X",
    color: "rgb(6, 158, 59)",
  });

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
        e.currentTarget.style.color = "rgb(6, 158, 59)";
        e.currentTarget.disabled = true;
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
        e.currentTarget.style.color = "rgb(248, 13, 111)";
        e.currentTarget.disabled = true;
        setPayer((prev) => ({
          ...prev,
          name: "  X",
          color: "rgb(6, 158, 59)",
        }));
      }
    }
  }
  function quit(){
    navigate('/');
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
        if (a === "X" && winner.player === "") {
          showwinner({
            player: `${a} Wins!!`,
            color: "rgb(6, 158, 59)",
          });
          setgameStatus("hidden");
          let xcount = p1count + 1;
          setcountp1(xcount);

          return true;
        } else if (a === "O" && winner.player === "") {
          showwinner({
            player: `${a} Wins!!`,
            color: "rgb(248, 13, 111)",
          });
          setgameStatus("hidden");
          let ocount = p2count + 1;
          setcountp2(ocount);
          return true;
        }
        return true;
      } else if (count === 9 && winner.player === "") {
        showwinner({
          player: "Match Drawn",
          color: "yellow",
        });
        setgameStatus("hidden");
        continue;
      }
    }
  }

  React.useEffect(() => {
    method();
  });
  React.useEffect(() => {
    if (resetbtn) {
      let elems = document.getElementsByTagName("button");
      for (let i = 0; i < elems.length; i++) {
        elems[i].disabled = false;
      }
      managereset(false);
    }
  }, [resetbtn]);
  const reset = (e: any) => {
    showwinner({
      player: "",
      color: "",
    });
    managereset(true);
    userCount(0);

    setBox((prev) => ({
      ...prev,
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
    setgameStatus("visible");
  };
  return (
      <div className="register">
   <div className="players border dccr">
    <div className="player1  dcc">
      <div className="player1 dccr">
        <img src={require('./x.png')} id="player1" alt="" />
        <h1>{Players.player1}</h1>
      </div>
      <div>
       <div className="dcc">
       <div className="scorebox dccr">
          <h1 className="text-light">{p1count}</h1>
        </div>
        <img src={require('./umpire.png')} alt="" id="umpire"/>
      </div>
       </div>
    </div>
<img src={require('./vs.png')} alt="" id="vs"/>
    <div className="player2  dcc">
    <div className="player2 dccr">
        <img src={require('./o.png')} id="player2" alt="" />
        <h1>{Players.player2}</h1>
      </div>
      <div>
       <div className="dcc">
       <div className="scorebox dccr">
          <h1 className="text-light">{p2count}</h1>
        </div>
        <img src={require('./umpire.png')} alt="" id="umpire"/>
      </div>
       </div>
    </div>

   </div>
        <div className="content" style={{ width: "100%" }}>
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
            <h1 style={{ color: `${winner.color}` }} className="mt-3">{winner.player}</h1>
            <div className="dccr mt-2">
            <Button id="reset" onClick={(e) => reset(e)} className="bg-success">
              Play Again
            </Button>
            <Button id="reset" onClick={(e) => quit()} className="bg-warning">
              Quit Game
            </Button>
            </div>
          </div>
        </div>
      </div>
  );
}
export default Game;
