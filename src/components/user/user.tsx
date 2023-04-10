import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import './user.css'

// type players={
//     player1:'',
//     player2:''

// }
export default function User() {
    const navigate = useNavigate();
const [error ,setError]=React.useState('')

    const [players,setPlayers]=React.useState({
        player1:'',
        player2:''

    });

function handle(e:FormEvent<HTMLInputElement>){
    e.preventDefault();
    setPlayers({...players,[e.currentTarget.id]:e.currentTarget.value})
    setError('')
}
function entergame(e:FormEvent<HTMLButtonElement>){
   if (!(players.player1==='' ||players.player2==='' )){
    e.preventDefault()
    sessionStorage.setItem('Players',JSON.stringify(players))
    navigate('/Tic-tac-toe/play')
   }
   else{
    setError('Please Enter the name to play')
   }
}


  return (
  <div className="dcc">
      <form  method="post" className='dcc mt-35' >
        <input type="text" name="" id="player1" onChange={e=>handle(e)} value={players.player1} placeholder="Enter the Player1" />
        <input type="text" name="" id="player2" onChange={e=>handle(e)} value={players.player2} placeholder="Enter the Player2"/>
        <button type="button" id="enter" onClick={e=>entergame(e)}>Enter the Game</button>
        <span id='error'>{error}</span>
    </form>
  </div>
  )
}