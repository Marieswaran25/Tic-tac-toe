import React from "react";
import { faCircleXmark, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./game.css";

function Game() {
  const navigate = useNavigate();
  const Players = JSON.parse(sessionStorage.getItem("Players") || "{}");
  const [gameStatus, setgameStatus] = React.useState("visible");
  const [resetbtn, managereset] = React.useState(false);
  const [current, setnext] = React.useState(false);
  let [count, userCount] = React.useState(0);
  let [p1count, setcountp1] = React.useState(0);
  let [p2count, setcountp2] = React.useState(0);
  const [x, xstate]: any = React.useState([]);
  const [y, ystate]: any = React.useState([]);
  let [winner, showwinner] = React.useState({player: "", color: "#f5615a"});

  const [currentPlayer, setPlayer] = React.useState({
    name: "X",
    color: "#f5615a",
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
        setBox((box) => ({...box,...updated}));
        userCount((count = count + 1));
        setnext(true);
        let xArray = x.push(e.target.id);
        xstate((prev: any) => [...prev, xArray]);
        e.currentTarget.style.color = "#f5615a";
        e.currentTarget.disabled = true;
        setPlayer((prev) => ({...prev, name: "O",color: "#3cc3f3"}));
      } 
      else {
        let updated = { [e.target.id]: "O" };
        setBox((box) => ({...box,...updated}));
        userCount((count = count + 1));
        setnext(false);
        let yArray = y.push(e.target.id);
        ystate((prev: any) => [...prev, yArray]);
        e.currentTarget.style.color = "#3cc3f3";
        e.currentTarget.disabled = true;
        setPlayer((prev) => ({...prev, name: "  X", color: "#f5615a"}));
      }
    }
  }
  function quit() {
   const userLeave = window.confirm('Do you want to leave the Game ?');
   if(userLeave){
    navigate("/");
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
      } 
      else if (a === b && b === c) {
        if (a === "X" && winner.player === "") {
          showwinner({player: `${a} won!!`, color: "#f5615a"});
          setgameStatus("hidden");
          let xcount = p1count + 1;
          setcountp1(xcount);
          return true;
        } 
        else if (a === "O" && winner.player === "") {
          showwinner({player: `${a} won!!`,color: "#3cc3f3"});
          setgameStatus("hidden");
          let ocount = p2count + 1;
          setcountp2(ocount);
          return true;
        }
        return true;
      } 
      else if (count === 9 && winner.player === "") {
        showwinner({player: "Match Drawn",color: "yellow"});
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
    showwinner({player: "", color: ""});
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
    <div className="register bg-dark">
      <div className="players border1 dccr">
        <div className="player1  dcc">
          <div className="player1 dccr">
            <img src={require("./x.png")} id="player1" alt="" />
            <p className="text-light"> {Players.player1}</p>
          </div>
          <h1 className="text-light">{p1count}</h1>
        </div>
        <div className="bg-danger" style={{ height: "60%", width: "2px" }}></div>
        <div className="player2  dcc">
          <div className="player2 dccr">
            <img src={require("./o.png")} id="player2" alt="" />
            <p className="text-light">{Players.player2}</p>
          </div>
          <h1 className="text-light">{p2count}</h1>
        </div>
      </div>
      <div className="content mt-3" style={{ width: "100%" }}>
        <div className="dcc">
          <h1 className={`${gameStatus} text-light`}>Player-<span style={{ color: `${currentPlayer.color}` }}>{currentPlayer.name}</span>'s play</h1>
        </div>
        <div className="outer mt-3">
          <div className="main">
            <button className="box" id="1" onClick={(e) => handlebox(e)}>{box[1]}</button>
            <button className="box" id="4" onClick={(e) => handlebox(e)}>{box[4]}</button>
            <button className="box" id="7" onClick={(e) => handlebox(e)}>{box[7]}</button>
          </div>
          <div className="main">
            <button className="box" id="2" onClick={(e) => handlebox(e)}>{box[2]}</button>
            <button className="box" id="5" onClick={(e) => handlebox(e)}>{box[5]}</button>
            <button className="box" id="8" onClick={(e) => handlebox(e)}>{box[8]}</button>
          </div>
          <div className="main">
            <button className="box" id="3" onClick={(e) => handlebox(e)}>{box[3]}</button>
            <button className="box" id="6" onClick={(e) => handlebox(e)}>{box[6]}</button>
            <button className="box" id="9" onClick={(e) => handlebox(e)}>{box[9]}</button>
          </div>
        </div>
        <div className="winner dcc">
          <h1 style={{ color: `${winner.color}`}} className="mt-2">{winner.player}</h1>
          <div className="dccr mt-2">
            <Button id="reset" onClick={(e) => reset(e)} className="bg-success text-light">Play Again <FontAwesomeIcon icon={faPlay} /></Button>
            <Button id="reset" onClick={(e) => quit()} className="bg-warning text-dark">Quit Game <FontAwesomeIcon icon={faCircleXmark} /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Game;
