/**
 * Player object for the game
 * @param {String} playingArea DOM location for this player
 */
function Player(playingArea)
{
    this.hand = [];
    this.playingArea = $(playingArea);
}

/**
 * Display this player's hand of cards as well as the player's current total on the page.
 */
Player.prototype.displayHand = function()
{
    var self = this;
    var hiddenCard;

    // display each card in the player's hand
    this.hand.forEach(function(card) {
        card.displayCard(self.playingArea);
        if (!card.visibility)
        {
            hiddenCard = card; // get a reference to the card without visibility
        }
    });

    // get the current hand total
    var handTotal = this.countHand();

    // if this hand has a hidden card, don't add its value to the hand total
    if (hiddenCard)
    {
        handTotal -= hiddenCard.getValue();
    }

    // update the current total on the page
    this.playingArea.find(".total").text(handTotal);
}

/**
 * Take a card from the deck, and update the display
 * @param  {[type]} deck of cards to use
 */
Player.prototype.hit = function(deck)
{
    this.hand.push(dealACard(deck));
    this.displayHand();
}

/**
 * Get the current points total for the player's hand
 * @return {Number} total points for the hand
 */
Player.prototype.countHand = function()
{
    var total = 0;
    var seenAnAce = false;

    // add each card's value to the total
    this.hand.forEach(function(card) {
        if (card.getName() === 'A') 
        {
            seenAnAce = true;
        }
        total += card.getValue();
    });

    // determine if Ace should be 1 or 11 points
    if (seenAnAce) 
    {
        if (total <= 11) 
        {
            total += 10;
        }
    }
    return total;
}