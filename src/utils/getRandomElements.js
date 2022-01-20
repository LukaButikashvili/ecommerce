function getRandomElementsFromArray(elementQuantity, array) {
  if (!elementQuantity) {
    return [];
  }

  const lastElement = array.length - 1;
  const randomNumber = Math.round(lastElement * Math.random()); //get random index
  const newElement = array[randomNumber];
  array.splice(randomNumber, 1);

  return [
    newElement,
    ...getRandomElementsFromArray(elementQuantity - 1, array),
  ];
}

export default getRandomElementsFromArray;
