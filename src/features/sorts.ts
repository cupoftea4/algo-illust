import { SortArray } from "../types";

export const bubbleSort = async (
  arr: SortArray,
  render: (arr: SortArray, swaps: number[]) => void,
  wait: Function,
  isAsc: boolean) => 
{
  const len = arr.length;
  let steps = 0;
  let checked;
    do {
      checked = false;
      for (let i = 0; i < len; i++) {
        if ((arr[i] > arr[i + 1] && isAsc) || (arr[i] < arr[i + 1] && !isAsc)) {
          render([...arr], [i, i + 1]);      
          await wait();
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          checked = true;
          steps++;
          
        }
        if(i === len - 1) render([...arr], [i, i + 1]);
      }
    } while (checked);
    return steps;
}

export const selectionSort = async (
  arr: SortArray,
  render: (arr: SortArray, swaps: number[]) => void,
  wait: Function,
  isAsc: boolean) => 
{
  const len = arr.length;
  let steps = 0;
  for (let i = 0; i < len; i++) {
    let control = i;
    for (let j = i + 1; j < len; j++) {
      if ((arr[j] < arr[control] && isAsc) || (arr[j] > arr[control] && !isAsc)) {
        control = j;      
      }
    }
    if (i !== control) {
      render([...arr], [i, control]);
      await wait();
      [arr[i], arr[control]] = [arr[control], arr[i]];
      steps++;
      console.log(arr);
      
    }
    if(i === len - 1) render([...arr], [i, i]);

  }
  return steps;
}

export const shellSort = async (
  arr: SortArray,
  render: (arr: SortArray, swaps: number[]) => void,
  wait: Function,
  isAsc: boolean) => 
{
  const len = arr.length;
  let steps = 0;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let temp = arr[i];
      let j;
      for (j = i; (j >= gap) && ((arr[j - gap] > temp && isAsc) || (arr[j - gap] < temp && !isAsc)); j -= gap) {
        arr[j] = arr[j - gap];
        render([...arr], [j, j - gap]);
        await wait();
        steps++;
      }
      arr[j] = temp;
    }
  }
  return steps;
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