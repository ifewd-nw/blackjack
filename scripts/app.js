(function($) {
               
    var NUMBER_OF_DIFF_VALUES = 13;  // 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A

    var playerHand = [],    // the player's hand of cards
          dealerHand = [],    // the dealer's hand of cards
          deck = [];              // the deck of cards

    /**
     * Card object
     * @param {integer} value the card's numerical value
     * @param {integer} suit  the card's Suit
     */
    var Card = function(value, suit) {
          if (value < 1 || value > 13) {
            throw new IllegalArgumentException("Card value argument must be between 1 and 13, inclusive");
          }
          
          this.value = value; // Values will be from 1 to 13
          this.suit = suit;
          this.visible = false;
          this.EL = $("<div class='card " + this.suit.suitClass + "'>" +
                         "<span class='rank'>" + this.getName() + "</span>" +
                         "<span class='suit'>" + this.suit.char + "</span>" +    
                         "</div>").data('card', this);
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
        return this.EL;
    };

    /**
     * Invert the Card's visibility property then call its display function
     * to return either a visible card or the back of the card.
     * @return {jQuery Object} HTML string used to display the card to the user
     */
    Card.prototype.toggleVisibility = function() {
        this.visible = !this.visible;
        if (!this.visible) {
            this.EL.removeClass(this.suit).addClass('back');
        } else {
            this.EL.removeClass('back').addClass(this.suit);
        }
        return this.display();
    };

    var suits = {
        clubs: { char: '&clubs;', suitClass: 'clubs' },
        spades: { char: '&spades;', suitClass: 'spades' },
        diams: { char: '&diams;', suitClass: 'diams' },
        hearts: { char: '&hearts;', suitClass: 'hearts' }
    };

    /**
     * Create a new deck of 52 cards
     * @return {Array} new deck of cards
     */
    function createDeck() {
        for (var suit in suits) {
            for (var index = 1; index <= NUMBER_OF_DIFF_VALUES; index++) {
                var card = new Card(index, suits[suit]);
                deck.push(card);
            }
        }
    }

    /**
     * Shuffle the deck to create a random order. 
     * Uses Durstenfeld version of Fisher-Yates shuffle algorithm.
     * @param  {Array} deck the deck to shuffle
     * @return {Array} returns the shuffled deck of cards
     */
    function shuffleDeck() {
        for (var i = deck.length-1; i > 0; i--) {
            var randVal = randomValue(i + 1);
            var temp = deck[i];
            deck[i] = deck[randVal];
            deck[randVal] = temp;
        }
    }

    /**
     * Get a random value between 0 and exclusive upper limit
     * @param  {Number} bound upper limit
     * @return {Number} random number generated
     */
    function randomValue(bound) {
        return (Math.floor(Math.random() * bound));
    }

    /**
     * Get a Card from the deck
     * @param  {Array} deck to pull a card from
     * @return {Card}      next card from the deck
     */
    function dealACard() {
        return deck.pop();            // get and remove a Card from the deck
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
            $("#player-hand").append(value.toggleVisibility());
        });

        updateCurrentTotal("player");

        // show the dealer's first card, but not the second
        dealer.forEach(function(value) {
            $("#dealer-hand").append(value.toggleVisibility());
        });

        updateCurrentTotal("dealer");
    }

    function updateCurrentTotal(user) {        
        if (user.indexOf("player") > -1) {
            var cTotal = getCurrentTotal(playerHand);
            if (cTotal <= 21) {
                updateUI("#player", cTotal);
            } else {
                console.log("Dealer wins. Player hand was greater than 21");
            }
        }
        if (user.indexOf("dealer") > -1) {
            var cTotal = getCurrentTotal(dealerHand);
            if (cTotal <= 21) {
                updateUI("#dealer", cTotal);
            } else {
                console.log("Player wins. Dealer hand was greater than 21");
            }
        }
    }

    function getUI(user) {
        return $(user).find(".total");
    }

    function updateUI(user, total) {
        var ui = getUI(user);
        ui.empty();
        ui.text(total);
    }

    $("#hit-me").click(function() {
        var card = dealACard();
        playerHand.push(card);
        card = card.toggleVisibility();
        $("#player-hand").append(card);
        updateCurrentTotal("player");
    });

    $("#stand").click(function() {

        while(getCurrentTotal(dealerHand) <= 16) {
            var card = dealACard();
            dealerHand.push(card);
            updateCurrentTotal("dealer");
            $("#dealer-hand").append(card);
        }

        dealerHand.forEach(function(card) {
            if (!card.visible) {
                card.toggleVisibility();
            }
        });
        checkWinner();
    });

    function getCurrentTotal(userHand) {
        var total = 0;
        userHand.forEach(function(card) {
            if (card.visible) {
                total += card.getValue();
            }
        });
        return total;
    }

    function checkWinner() {
        if (getCurrentTotal(playerHand) > getCurrentTotal(dealerHand)) {
            console.log("Player wins");
        } else {
            console.log("Dealer wins");
        }

        //startGame();
    }

    // TODO: add function to determine the winner

    /**
     * Start the game of BlackJack.
     */
    function startGame() {
        resetGame();
        createDeck();
        shuffleDeck();
        playerHand.push(dealACard());

        var dealerHiddenCard = dealACard();
        dealerHiddenCard.toggleVisibility();
        dealerHand.push(dealerHiddenCard);

        playerHand.push(dealACard());
        dealerHand.push(dealACard());

        showInitialHands(playerHand, dealerHand);
    }

    function resetGame() {
        deck = [];
        playerHand = [];
        dealerHand = [];
        $("#player-hand").empty();
        $("#dealer-hand").empty();
    }

    startGame();

})(jQuery);