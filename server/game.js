// Set up

class Game {

    // constructor takes in an array of sockets
    constructor(firstPlayer, secondPlayer) {
        this._players = [firstPlayer, secondPlayer]
        this._playersID = [firstPlayer.id, secondPlayer.id]
        this._scores = [0, 0]
        this._playGame()
    }

    _sendIntroToPlayers(m) {
        this._players.forEach((player) => {
            player.emit('introMessage', `Welcome player with id of: ${player.id}`)
        })
    }

    _resetScore() {
        this._players.forEach((player) => {
            player.emit('resetScores', 0)
        })
    }

    _updateScore(player) {
        if (player == 'player1-button') {
            this._scores[0] += 1
        } else if (player == 'player2-button') {
            this._scores[1] += 1
        }
    }

    _listenForClicksAndUpdateScore() {
        this._players.forEach((player) => {
            // update score array server side
            player.on('click', (scores) => {
                this._updateScore(scores)
                this._emitScoreArrayToPlayers()
            })
        })
    }

    _emitScoreArrayToPlayers() {
        this._players.forEach((player) => {
            player.emit('updateScores', this._scores)
        })
    }

    _removeClickHandlers() {
        this._players.forEach((player)=> {
            player.emit('addHandlers', this._playersID)
        })
    }

    _playGame() {
        this._sendIntroToPlayers()
        this._removeClickHandlers()
        this._resetScore()
        this._listenForClicksAndUpdateScore()
    }
}

module.exports = Game;
console.log("Game file has loaded server side")