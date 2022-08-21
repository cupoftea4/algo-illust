const SORT_ASC = 'asc';

const wait = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
}

export const bubbleSort = async (arr: number[], animate: Function) => {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            animate(arr);
            await wait();
            // setArray([...arr]);
          }
        }
      }
     return arr;
}