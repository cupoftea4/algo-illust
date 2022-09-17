import { SortFunc, SortArray, RenderFunc } from "../types";
import isSorted from "./isSorted";

let IS_ASC = true;
let STEPS = 0;

export const bubbleSort: SortFunc = async (arr, render, isASC) => {
  const len = arr.length;
  let steps = 0;
  let checked;
    do {
      checked = false;
      for (let i = 0; i < len; i++) {
        if ((arr[i] > arr[i + 1] && isAsc) || (arr[i] < arr[i + 1] && !isAsc)) {
          await render([...arr], {green: [i, i + 1]});      
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          checked = true;
          steps++;
          
        }
        if(i === len - 1) render([...arr], [i, i + 1]);
      }
    }
  } while (checked);
  return steps;
};

export const selectionSort: SortFunc = async (arr, render, isASC) => {
  const len = arr.length;
  let steps = 0;
  for (let i = 0; i < len; i++) {
    let control = i;
    for (let j = i + 1; j < len; j++) {
      if (
        (arr[j] < arr[control] && isASC) ||
        (arr[j] > arr[control] && !isASC)
      ) {
        control = j;
      }
    }
    if (i !== control) {
      await render([...arr], {green: [i, control]});
      [arr[i], arr[control]] = [arr[control], arr[i]];
      steps++;
      console.log(arr);
      
    }
    if(i === len - 1) render([...arr], [i, i]);

  }
  return steps;
};

export const shellSort: SortFunc = async (arr, render, isASC) => {
  const len = arr.length;
  let steps = 0;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let temp = arr[i];
      let j;
      for (
        j = i;
        j >= gap &&
        ((arr[j - gap] > temp && isASC) || (arr[j - gap] < temp && !isASC));
        j -= gap
      ) {
        arr[j] = arr[j - gap];
        await render([...arr], {green: [j, j - gap]});
        steps++;
        console.log(arr);
      }
      arr[j] = temp;
      console.log(arr);
    }
  }
  return steps;
};

export const quickSort: SortFunc = async (arr, render, isASC) => {
  STEPS = 0; IS_ASC = isASC;
  await quickSortLocal(arr, 0, arr.length - 1, render);
  return STEPS;
};

export const mergeSort: SortFunc = async (arr, render, isASC) => {
  console.log(arr);
  STEPS = 0; IS_ASC = isASC;
  const len = arr.length;
  let currSize;
  let leftStart;

  for (currSize = 1; currSize <= len - 1; currSize = 2 * currSize) {
    for (leftStart = 0; leftStart < len - 1; leftStart += 2 * currSize) {
      const mid = Math.min(leftStart + currSize - 1, len - 1);
      const rightEnd = Math.min(leftStart + 2 * currSize - 1, len - 1);
      await merge(arr, leftStart, mid, rightEnd, render);
      STEPS++;
    }
  }
  return STEPS;
}

export const countingSort: SortFunc = async (arr, render, isASC) => {
  if (Array.isArray(arr[0]) || (typeof arr[0] === "string")) {
    alert("Counting sort only works with numbers");
    throw new Error("Counting sort can only be used with numbers");
  }
  console.log(arr);
  let steps = 0;
  const len = arr.length;
  const max = Math.max(...arr as number[]);
  const min = Math.min(...arr as number[]);
  const count = new Array(max - min + 1).fill(0);
  for (let i = 0; i < len; i++) {
    count[arr[i] as number - min]++;
  }
  console.log(count);
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  console.log(count);
  const sorted = new Array(len).fill(0);
  let index;
  for (let i = len - 1; i >= 0; i--) {
    index = isASC ? (--count[arr[i] as number - min]) : ((len - 1) - (--count[arr[i] as number - min]));
    sorted[index] = arr[i];
    console.log(count[arr[i] as number - min], arr[i]);
    console.log(sorted);
    steps++;
    await render([...sorted], {green: [index]});
  }
  return steps;
};

async function partition (
  items: SortArray,
  left: number,
  right: number,
  render: RenderFunc
) {
  if (Array.isArray(items[0])) {
    let matrix = [...(items as number[][])];
    let pivot = matrix[Math.floor((right + left) / 2)][0]; //middle elemen
    console.log(pivot);
    let i = left; //left pointer
    let j = right; //right pointer
    while (i <= j) {
      while (matrix[i][0] < pivot) {
        i++;
      }
      while (matrix[j][0] > pivot) {
        j--;
      }
      if (i <= j) {
        // swap
        [matrix[i], matrix[j]] = [matrix[j], matrix[i]];
        [items[i], items[j]] = [items[j], items[i]];
        i++; j--;
      }
    }
    return i;
  } else {
    const pivotIndex = Math.floor((right + left) / 2);
    const pivot = items[pivotIndex]; //middle element
    let i = left; //left pointer
    let j = right; //right pointer
    while (i <= j) {
      while ((IS_ASC && items[i] < pivot) || (!IS_ASC && items[i] > pivot)) {
        i++;
      }
      while ((IS_ASC && items[j] > pivot) || (!IS_ASC && items[j] < pivot)) {
        j--;
      }
      if (i <= j) {
        [items[i], items[j]] = [items[j], items[i]];
        await render([...items], {green: [i, j], orange: [pivotIndex]});
        STEPS++;
        i++; j--;
      }
    }
    return i;
  }
}

async function quickSortLocal (
  items: SortArray,
  left: number,
  right: number,
  render: RenderFunc
) {
  let index;
  if (items.length > 1 && !isSorted(items, true)) {
    index = await partition(items, left, right, render);
    if (left < index - 1) {
      await quickSortLocal(items, left, index - 1, render);
    }
    if (index < right) {
      await quickSortLocal(items, index, right, render);
    }
  }
  return items;
}

async function merge (
  arr: SortArray,
  left: number,
  mid: number,
  right: number,
  render: RenderFunc
) {
  let i, j, k;
  let len1 = mid - left + 1;
  let len2 = right - mid;

  let leftArray = arr.slice(left, mid + 1);
  let rightArray = arr.slice(mid + 1, right + 1);

  i = 0; j = 0; k = left;
  while (i < len1 && j < len2) {
    if ((IS_ASC && leftArray[i] <= rightArray[j]) || (!IS_ASC && leftArray[i] > rightArray[j])) {
      arr[k] = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of L, if there are any
  while (i < len1) {
    arr[k] = leftArray[i];
    i++; k++;
  }

  // Copy the remaining elements of R, if there are any
  while (j < len2) {
    arr[k] = rightArray[j];
    j++; k++;
  }
  await render([...arr], {green: [i + left, j + right - 1]});
  console.log(arr);
}
