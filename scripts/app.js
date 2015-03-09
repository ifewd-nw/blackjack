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
     * Method that constructs the HTML for displaying the Card.
     * @return {jQuery object} formatted HTML string for the Card
     */
    Card.prototype.display = function() {
        return $("<div class='card'>"+
                     "<span class='rank'>" + this.getName() + "</span>" + 
                     "</div>");
    };
    }
  };
 
  Card.prototype.toggleVisibility = function() {
    this.visible = !this.visible;
    return this.display();
  };