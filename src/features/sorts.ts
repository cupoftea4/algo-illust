export const bubbleSort = async (arr: number[], render: Function, wait: Function) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (arr[j] > arr[j + 1]) {
        render([...arr], [j, j + 1]);
        await wait();
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

export const selectionSort = async (arr: number[], render: Function, wait: Function) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (i !== min) {
      render([...arr], [i, min]);
      await wait();
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
  return arr;
}

export const shellSort = async (arr: number[], render: Function, wait: Function) => {
   const len = arr.length;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
        render([...arr], [j, j - gap]);
        await wait();
      }
      arr[j] = temp;
    }
  }
  return arr;
}

export const countingSort = async (arr: number[], render: Function, wait: Function) => {
  const len = arr.length;
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const count = new Array(max - min + 1).fill(0);
  for (let i = 0; i < len; i++) {
    count[arr[i] - min]++;
  }
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  const sorted = new Array(len).fill(0);
  for (let i = len - 1; i >= 0; i--) {
    sorted[--count[arr[i] - min]] = arr[i];
    render([...sorted], [i, count[arr[i] - min]]);
    await wait();
  }
  return sorted;
}

// export const mergeSort = async (arr: number[], render: Function, wait: Function) => {
//   const merge = (left: number[], right: number[]) => {
//     const result: number[] = [];
//     while (left.length && right.length) {
//       if (left[0] <= right[0]) {
//         result.push(left.shift() || 0);
//       } else {
//         result.push(right.shift() || 0);
//       }
//     }
//     return [...result, ...left, ...right];
//   }
//   if (arr.length < 2) {
//     return arr;
//   }
//   const middle = Math.floor(arr.length / 2);
//   const left = arr.slice(0, middle);
//   const right = arr.slice(middle);
//   return merge(await mergeSort(left, render, wait), await mergeSort(right, render, wait));
// }