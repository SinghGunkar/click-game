var socket = io()

// Listen for intro message
socket.on('introMessage', (msg) => {
    console.log(msg)
})

// If player is waiting
socket.on('waitMessage', (msg) => {
    document.getElementById('player2-score').innerHTML = msg
})

// Reset scores
socket.on('resetScores', (score) => {
    document.getElementById('player2-score').innerHTML = `Player 2 score: ${score}`
})

// Update scores
socket.on('updateScores', (scores) => {
    document.getElementById('player1-score').innerHTML = `Player 1 score: ${scores[0]}`
    document.getElementById('player2-score').innerHTML = `Player 2 score: ${scores[1]}`
})

// Handle click
function HandleClick(player) {
    socket.emit('click', player)
    console.log(player,'clicked')
}

// Set up button event listeners 
socket.on('addHandlers', (data) => {
    if (socket.id == data[0]) {
        player = 'player1-button'
        document.getElementById("player1-button").addEventListener("click", function() {
            HandleClick(player)
        })
    } else if (socket.id == data[1]) {
        player = 'player2-button'
        document.getElementById("player2-button").addEventListener("click", function() {
            HandleClick(player)
        })
    }
})

console.log('Client side javascript file has loaded')