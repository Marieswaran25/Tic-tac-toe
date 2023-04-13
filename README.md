# To run locally

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# Description

A typical Tic-Tac-Toe Game build with react-bootstrap (template:Typescript)

Logic handling:

* For the first time default click will be X (even in refresh), once box clicked, it appears on the box front,and in the back it stoes in array
* Next it points to Y ,and it goes vice-versa on each click
* On Each click, function continously monitoring if it satisfies the winning combination (check whether if 3 values of x or o in the respective position)
* If it is, then result shown and winner count will be shown
* otherwise it checks the count(count must be equals to 9) and if doesn't satisfy the winning comination ,it shown Match drawn and not winning count added to both.
* If user clicks play again,the first click will be the next to who clicks the final move in the previous round or state.
(For example,If x wins in the first round or clicks play again button in middle of x move,the first move of next round is O and vice-versa).




