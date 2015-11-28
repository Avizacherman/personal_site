var Deck = function(cardList){
    this.cardList = cardList
}

Deck.prototype.shuffleDeck = function () {
  var temp
  for(var i = 0; i<this.cardList.length; i++){
    var rando = Math.floor(Math.random()*(this.cardList.length - 1))
    temp = this.cardList[i]
    this.cardList[i] = this.cardList[rando]
    this.cardList[rando] = temp
  }
}

Deck.prototype.drawTopCard = function () {

  return this.cardList.pop()
}
