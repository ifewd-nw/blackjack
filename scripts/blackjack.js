var blackjack;      // global for blackjack deck
var players = {     // global for blackjack players
    player: {},
    dealer: {}
}

/**
 * Initiate blackjack's game state. To be called anytime a new game begins.
 */
function resetGame()
{
    $("#game-results").empty().hide(); // clear out and hide any results from a previous game
    blackjack = new Deck();
    blackjack.deck = shuffleDeck(blackjack.deck);
    players.player = new Player("#player");
    players.dealer = new Player("#dealer");
    players.player.hit(blackjack.deck);
    players.dealer.hit(blackjack.deck);

    // hide the dealer's first card
    var card = players.dealer.hand[0];
    card.toggleVisibility();
    card.displayCard();

    players.player.hit(blackjack.deck);
    players.dealer.hit(blackjack.deck);
}

// start a new game
resetGame();

/**
 * Click event handler for when the user clicks the Hit button. Adds another card to the player's hand.
 */
$("#hit").click(function() {
    players.player.hit(blackjack.deck); // player takes another card

    // check if player busted
    if (didPlayerBust(players.player))
    {
        displayGameResults("Player busted");
        displayPlayAgain();
    }
});

/**
 * Click event handler for when the user clicks the Stand button. Dealer starts its turn,
 * and will continue to play until it has a hand total greater than 16.
 */
$("#stand").click(function() {
    while (players.dealer.countHand() <= 16)
    {
        players.dealer.hit(blackjack.deck); // dealer takes another card
    }

    // check if dealer busted
    if (didPlayerBust(players.dealer))
    {
        displayGameResults("Dealer busted");
        displayPlayAgain();
    }
    // dealer didn't bust, check which player won 
    else 
    {
        checkScores();
    }
});

/**
 * Helper function to determine if the player busted
 * @param  {Player object} player to count hand of
 * @return {Boolean}  whether player hand total was greater than 21 or not
 */
function didPlayerBust(player)
{
    return (player.countHand() > 21) ? true : false;
}

/**
 * Determine which player had the highest score or if players tied.
 */
function checkScores()
{
    // check if player wins
    if (players.player.countHand() > players.dealer.countHand())
    {
        displayGameResults("Player wins");
    }
    // else check if dealer wins
    else if (players.player.countHand() < players.dealer.countHand())
    {
        displayGameResults("Dealer wins");
    }
    // else check if both players tied
    else if (players.player.countHand() == players.dealer.countHand())
    {
        displayGameResults("Tie Game");
    }

    // display the play again button after determining the winner
    displayPlayAgain();
}

/**
 * Display the play again button.
 */
function displayPlayAgain()
{
    $("#play-again").show();
    $("#play-again").click(function() {
        $(".card").remove(); // remove all existing cards from UI
        resetGame();           // start the game over
        $(this).hide();           // hide the button again
    });
}

/**
 * Display all hidden cards and the end of game message
 * @param  {String} textToDisplay message to the user (tie, winner, or who busted)    
 */
function displayGameResults(textToDisplay)
{
    // first display all hidden cards
    players.dealer.hand.forEach(function(card) {
        if (!card.visibility)
        {
            card.toggleVisibility();
            card.displayCard();
        }
    });
    // update the dealer's hand - the one player that had hidden cards
    players.dealer.displayHand();

    // show the results
    $("#game-results").append("<p>" + textToDisplay + "</p>").show();
}