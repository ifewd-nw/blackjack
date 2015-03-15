/**
 * Object to represent a playing card
 * @param {Number} value the card's value
 * @param {Suit suit  the card's suit (Hearts, Diamonds, Clubs, or Spades)
 */
function Card(value, suit) 
{
    if (value < 1 || value > 13)
        throw 'Error';
    this.value = value;
    this.suit = suit;
    this.visibility = true; // Visibility is true by default since only 1 card needs to be hidden

    // Element representing how to display the card on the page
    this.EL = $("<div class='card " + this.suit.suitClass + "'>" +
                   "<span class='rank'>" + this.getName() + "</span>" +
                   "<span class='suit'>" + this.suit.char + "</span>" +
                   "</div>").data('card', this);
}

/**
 * Get the rank of the card.
 * @return {Number or Char} Return the value or royalty abbreviation 
 */
Card.prototype.getName = function()
{
    if (this.value > 1 && this.value <= 10)
    {
        return this.value;
    } else {
        switch(this.value)
        {
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
}

/**
 * Get the value of the card. Royal cards are value 10 or 1 if Ace
 * @return {Number} value of the card
 */
Card.prototype.getValue = function()
{
    return (this.value > 10) ? 10 : this.value;
}

/**
 * Toggle the visibility of the card
 */
Card.prototype.toggleVisibility = function()
{
    this.visibility = !this.visibility;
    this.updateCard();
}

/**
 * Display the card
 * @param  {String} location where to display the card
 */
Card.prototype.displayCard = function(location)
{
    $(location).append(this.EL);
}

/**
 * Update the card elements class attribute based on the card's visibility.
 */
Card.prototype.updateCard = function()
{
    if (this.visibility)
    {
        this.EL.removeClass("back").addClass(this.suit.suitClass);
    } else 
    {
        this.EL.removeClass(this.suit.suitClass).addClass("back");
    }
}