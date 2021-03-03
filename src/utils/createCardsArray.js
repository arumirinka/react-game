const shuffle = (array) => {
  const shuffledArray = [...array];
  for (let i = 0; i < array.length; i += 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = tmp;
  }
  return shuffledArray;
};

const cards = ['apple', 'banana', 'carrot', 'cherry', 'cucumber', 'eggplant', 'garlic', 'grape'];

const cardsArray = [...cards].concat(cards).sort().map((imgTitle, i) => ({
  id: i,
  imgTitle,
}));

const createCardsArray = () => shuffle(cardsArray);

export default createCardsArray;
