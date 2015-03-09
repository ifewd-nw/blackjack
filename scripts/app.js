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

    /**
     * Get the value of the Card. If card is royal (not Ace)
     * return 10 otherwise return the value
     * @return {[type]} [description]
     */
    Card.prototype.getValue = function() {
        return (this.value > 10) ? 10 : this.value;
    };

    /**
     * Get the name (if royal card) or the value (if not royal card)
     * @return {integer or string} representation of the card's value
     */
    Card.prototype.getName = function() {
        if (this.value > 1 && this.value <= 10) {
            return this.value;
        } else {
            switch(this.value) {
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
     * Method that constructs the HTML for displaying the Card.
     * @return {jQuery object} formatted HTML string for the Card
     */
    Card.prototype.display = function() {
        return $("<div class='card'>"+
                     "<span class='rank'>" + this.getName() + "</span>" + 
                     "</div>");
    };

    /**
     * Suits available to the deck
     * @type {Object}
     */
    var Suit = Object.freeze({
        SPADES: { value: 1, name: 'Spades' },
        CLUBS: { value: 2, name: 'Clubs' },
        HEARTS: { value: 3, name: 'Hearts' },
        DIAMONDS: { value: 4, name: 'Diamonds' }
    });

    }
  };
 
  Card.prototype.toggleVisibility = function() {
    this.visible = !this.visible;
    return this.display();
  };