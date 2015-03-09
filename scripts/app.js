  // Suit class
  var Suit = function(name, abbr, char) {
    this.name = name;
    this.abbr = abbr;
    this.char = char;
  };
 
  var suits = {
    clubs: new Suit('Clubs', 'C', '&clubs;'),
    diamonds: new Suit('Diamonds', 'D', '&diams;'),
    hearts: new Suit('Hearts', 'H', '&hearts;'),
    spades: new Suit('Spades', 'S', '&spades;')
  };
 
  // Card object
  var Card = function(value, suit) {
    this.value = value;
    this.suit = suit;
    this.visible = false;
  };
 
  Card.prototype.getValue = function() {
    return (this.value > 10) ? 10 : this.value;
  };
 
  Card.prototype.getName = function() {
    if (this.value > 1 && this.value <= 10) {
      return this.value;
    } else {
      switch (this.value) {
      case 1:
        return 'A';
      case 11:
        return 'J';
      case 12:
        return 'Q';
      case 13:
        return 'K';
      }
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