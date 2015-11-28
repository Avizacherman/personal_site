"use strict"

var Game = function(whiteDeck, blackDeck){
  this.whiteDeck = new Deck(whiteDeck)
  this.blackDeck = new Deck(blackDeck)
  this.players = []
}

Game.prototype.initialize = function(){
  this.whiteDeck.shuffleDeck()
  this.blackDeck.shuffleDeck()

  for(var i =0; i< 4; i++){
    var compPlayer = new Player()
    this.players.push(compPlayer)
  }

  console.log(this.players)
  this.setUpCards()
}

Game.prototype.setUpCards = function(){

  var currentBlackCard = this.blackDeck.drawTopCard()
  $('#black-card-text').html(currentBlackCard.text)

  for(var i=0; i< currentBlackCard.pick; i++){
    var $row = $('<div>').addClass('row').attr('id', 'white-row-'+i)
    for(var j=0; j < 4; j++){
      var $card = $('<div>').addClass('card-panel white')

      var $whiteSpan = $('<span>').addClass('white-card-text').html(this.whiteDeck.drawTopCard())
      $card.append($whiteSpan)
      var $whiteHolder = $('<div>').addClass('col s3 white-col').attr('id', 'white-col-'+j)

      $('#white-card-container').append($row.append($whiteHolder.append($card)))
      }
    }
    this.setUpPlayerPick()
}

Game.prototype.setUpPlayerPick = function () {
  var $buttonHolder = $('<div>').addClass('row').attr('id', 'select-button-holder')

  for(let i=0; i<4; i++){
    var $col = $('<div>').addClass('col s3')
    var $selectButton = $('<a>')
    .addClass('waves-effect waves-light black btn')
    .text(`Select Player ${i+1}`)
    .attr('id', `player-${i}`)
    .click(()=>{this.incrementScore(i)})

    $buttonHolder.append($col.append($selectButton))
  }
  $('#white-card-container').append($buttonHolder)
}

Game.prototype.checkWin = function(){
  return this.players.some(function(player){
    return player.score === 6
  })
}

Game.prototype.resetGame = function(){
  $('.player-scores').each(function(){
    $(this).text(0)
  })

  $('#white-card-container').empty()

  var game = new Game(cardList.whiteCards, cardList.blackCards)
  game.initialize()
}

Game.prototype.incrementScore = function(player){
  console.log(player)
  var score = this.players[player].increaseScore()
  $(`#player-${player+1}`).text(score)
  if(this.checkWin()){
      var again = confirm(`Player ${player+1} Wins!`)
      if(again){
        this.resetGame()
      }

  } else {
    $('#white-card-container').empty()
    this.setUpCards()
  }
}

var game = new Game(cardList.whiteCards, cardList.blackCards)
game.initialize()
