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

    /**
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

    /**
     * Create a new deck of 52 cards
     * @return {Array} new deck of cards
     */
    function createDeck() {
        var deck = [];
        for (var i = Suit.SPADES.value; i <= Suit.DIAMONDS.value; i++) {
            for (var j = 1; j <= 13; j++) {
                var card = new Card(j, i);
                deck.push(card);
            }
        }
        return deck;
    }

    /**
     * Shuffle the deck to create a random order. 
     * Uses Durstenfeld version of Fisher-Yates shuffle algorithm.
     * @param  {Array} deck the deck to shuffle
     * @return {Array} returns the shuffled deck of cards
     */
    function shuffleDeck(deck) {
        for (var i = deck.length-1; i > 0; i--) {
            var randVal = Math.floor(Math.random() * (i + 1));
            var temp = deck[i];
            deck[i] = deck[randVal];
            deck[randVal] = temp;
        }
        return deck;
    }

    /**
     * Get a Card from the deck
     * @param  {Array} deck to pull a card from
     * @return {Card}      next card from the deck
     */
    function dealACard(deck) {
        return deck.shift();            // get and remove first Card from the deck
    }

    /**
     * Show the initial two cards dealt for the player, and one card for the 
     * dealer with the second card for the dealer being hidden.
     * @param  {Array} player the player's initial hand
     * @param  {Array} dealer the dealer's initial hand
     */
    function showInitialHands(player, dealer) {
        // show the player's cards
        player.forEach(function(value) {
            $("#player-hand").append(value.display());
        });

        // show the dealer's first card, but not the second
        $("#dealer-hand").append(dealer[0].display());
        $("#dealer-hand").append("<div class='card'>hidden</div>"); // don't show the dealer's second card
    }

    // TODO: add event handler when player clicks on 'Hit' button - player will be dealt another card from the deck.
    
    // TODO: add event handler when player clicks on 'Stand' button - dealer starts its turn
    
    // TODO: add function for dealer to determine if the dealer is going to either 'hit' or 'stand'

    // TODO: add function to determine the winner

    /**
     * Start the game of BlackJack.
     */
    function startGame() {
        var deck = createDeck();
        deck = shuffleDeck(deck);
        var playerHand = [];
        var dealerHand = [];
        playerHand.push(dealACard(deck));   // player gets a card first ...
        dealerHand.push(dealACard(deck));   // then dealer
        playerHand.push(dealACard(deck));       
        dealerHand.push(dealACard(deck));
        showInitialHands(playerHand, dealerHand);
    }

    startGame();

})(jQuery);