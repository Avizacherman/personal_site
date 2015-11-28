var Player = function(){
  this.score = 0
}

Player.prototype.increaseScore = function(){
  return ++this.score
}
