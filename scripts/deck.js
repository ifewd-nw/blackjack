var AVAILABLE_VALUES = 13; // Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K

/**
 * Deck of cards object.
 */
function Deck()
{
    this.deck = createDeck();
}

/**
 * Create a 52 card deck
 * @return {[Card]} array of cards
 */
function createDeck()
{
    var createdDeck = [];
    for (var suit in suits)
    {
        for (var index = 1; index <= AVAILABLE_VALUES; index++)
        {
            var card = new Card(index, suits[suit]);
            createdDeck.push(card);
        }
    }
    return createdDeck;
}

/**
 * Shuffle a deck of cards
 * @param  {[Card]} deckToShuffle array of cards to shuffle
 * @return {[Card]}  shuffled array of cards
 */
function shuffleDeck(deckToShuffle)
{
    for (var index = deckToShuffle.length - 1; index > 0; index--)
    {
        var randVal = randomValue(index + 1); // make a random index
        var temp = deckToShuffle[index];
        deckToShuffle[index] = deckToShuffle[randVal];
        deckToShuffle[randVal] = temp;
    }
    return deckToShuffle;
}

/**
 * Get a random value between 0 and exclusive upper limit
 * @param  {Number} bound upper limit
 * @return {Number}       random number generated
 */
function randomValue(bound)
{   
    return (Math.floor(Math.random() * bound));
}

/**
 * Get a card from the deck
 * @param  {[type]} deckToUse deck of cards to pull from
 * @return {Card}           card removed from the deck
 */
function dealACard(deckToUse)
{
    return deckToUse.pop();
}