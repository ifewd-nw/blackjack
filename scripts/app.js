(function($) {

    /**
     * Card object
     * @param {integer} value the card's numerical value
     * @param {integer} suit  the card's Suit
     */
    var Card = function(value, suit) {
          this.value = value; // Values will be from 1 to 13
          this.suit = suit;
    }
  };
 
  Card.prototype.display = function() {
    if (this.visible) {
      return $('<div class="card ' + this.suit.name + '">' +
                 '<span class="rank">' + this.getName() + '</span>' +
                 '<span class="suit">' + this.suit.char + '</span>' +
               '</div>').data('card', this);
    } else {
      return $('<div class="card back ' + this.suit.name + '">' +
                 '<span class="rank">' + this.getName() + '</span>' +
                 '<span class="suit">' + this.suit.char + '</span>' +
               '</div>').data('card', this);
    }
  };
 
  Card.prototype.toggleVisibility = function() {
    this.visible = !this.visible;
    return this.display();
  };