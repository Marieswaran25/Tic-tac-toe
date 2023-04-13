import { faCloudBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function User() {
    const navigate = useNavigate();
const [error ,setError]=React.useState('')

    const [players,setPlayers]=React.useState({
        player1:'',
        player2:''

    });

function handle(e:React.ChangeEvent<any>){
    e.preventDefault();
    setPlayers({...players,[e.currentTarget.id]:e.currentTarget.value})
    setError('')
}
function entergame(e:FormEvent<HTMLButtonElement>){
    e.preventDefault();
    if (players.player1==='' ||players.player2==='' ){
      setError('*Please Enter the players name to play')
     }
    else if(players.player1.length>=12||players.player2.length>=12){
      setError('*Name should Within Eight characters')
     }
   else{
    e.preventDefault()
    sessionStorage.setItem('Players',JSON.stringify(players))
    navigate('/Tic-tac-toe/play')
   }
}


  return (
  <div className="register bg-dark dccx" style={{"height":"100vh"}}>
    <img src={require('./logo.png')} alt="" style={{"width":"100px","height":"100px"}}/>
    <div className="dccr">
    <Card bg={"bg-dark"} style={{"border":"none"}}>
              <Form className='bg-dark text-light' style={{"border":"none"}}>
                <Form.Group className="mb-4">
                  <Form.Label >Enter the Player 1</Form.Label>
                  <Form.Control type="text" placeholder="Enter the Player 1" id="player1" style={{"height":"50px","width":"100%","border":"1px solid gray"}} value={players.player1} onChange={e=>handle(e)}  className='bg-light text-dark'/>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label >Enter the Player 2</Form.Label>
                  <Form.Control type ="text" placeholder="Enter the Player 2" id="player2" style={{"height":"50px","width":"100%","border":"1px solid gray"}} value={players.player2} onChange={e=>{handle(e)}}  className='bg-light text-dark'/>
                </Form.Group>
                <Button  style={{ width: "100%" }}className="Submit mb-2" onClick={e=>entergame(e)}>Let's Play <FontAwesomeIcon icon={faCloudBolt} /></Button>
                <center>
                <Form.Text className='text-danger'>{error}</Form.Text>
                </center>
              </Form>
            </Card>
    </div>
   </div>
  )
}