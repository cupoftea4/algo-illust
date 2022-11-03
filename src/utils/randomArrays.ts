const generateRandomArray = (length: number = 10, max: number = 10, withNegative: boolean = false) => {
  const array = [];
  if (withNegative) {
    for (let i = 0; i < length; i++) {
      array.push(Math.floor(Math.random() * max * 2) - max);
    }
  } else {
    for (let i = 0; i < length; i++) {
      array.push(Math.floor(Math.random() * max));
    }
  }
  return array;
};

export default generateRandomArray;