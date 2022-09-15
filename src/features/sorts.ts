import { SortFunc, SortArray, RenderFunc } from "../types";
import isSorted from "./isSorted";

export const bubbleSort: SortFunc = async (arr, render, isASC) => {
  const len = arr.length;
  let steps = 0;
  let checked;
  do {
    checked = false;
    for (let i = 0; i < len; i++) {
      if ((arr[i] > arr[i + 1] && isASC) || (arr[i] < arr[i + 1] && !isASC)) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        await render([...arr], [i, i + 1]);
        checked = true;
        steps++;
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
      [arr[i], arr[control]] = [arr[control], arr[i]];
      await render([...arr], [i, control]);
      steps++;
    }
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
        await render([...arr], [j, j - gap]);
        steps++;
        console.log(arr);
      }
      arr[j] = temp;
      console.log(arr);
      
    }
  }
  return steps;
};

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
  for (let i = len - 1; i >= 0; i--) {
    sorted[--count[arr[i] as number - min]] = arr[i];
    console.log(count[arr[i] as number - min], arr[i]);
    console.log(sorted);
    steps++;
    await render([...sorted], [i, count[arr[i] as number - min]]);
  }
  return steps;
};

export const quickSort: SortFunc = async (arr, render, isASC) => {
  await quickSortLocal(arr, 0, arr.length - 1, render);
  return 0;
};

async function swap(
  items: SortArray,
  leftIndex: number,
  rightIndex: number,
  render: Function
) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  await render([...items], [leftIndex, rightIndex]);
}

async function swapLocal(
  items: number[] | number[][],
  leftIndex: number,
  rightIndex: number
) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  console.log(items);
}

async function partition(
  items: SortArray,
  left: number,
  right: number,
  render: RenderFunc,
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
        swapLocal(matrix, i, j);
        await swap(items, i, j, render); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  } else {
    var pivot = items[Math.floor((right + left) / 2)]; //middle element
    let i = left; //left pointer
    let j = right; //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        await swap(items, i, j, render); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }
}

async function quickSortLocal(
  items: SortArray,
  left: number,
  right: number,
  render: RenderFunc,
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


export const mergeSort: SortFunc = async (arr, render, isASC) => {
  console.log(arr);
  let n = arr.length;
  var curr_size;
  var left_start;

  for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {

    for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {

      var mid = Math.min(left_start + curr_size - 1, n - 1);
      var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);
      await merge(arr, left_start, mid, right_end, render);
    }
  }
  return 0;
}

/*
 * Function to merge the two haves arr[l..m] and arr[m+1..r] of array arr
 */
async function merge(
  arr: SortArray,
  l: number,
  m: number,
  r: number,
  render: RenderFunc,
) {
  var i, j, k;
  var n1 = m - l + 1;
  var n2 = r - m;

  /* create temp arrays */
  var L = Array(n1).fill(0);
  var R = Array(n2).fill(0);

  /*
   * Copy data to temp arrays L and R
   */
  for (i = 0; i < n1; i++) L[i] = arr[l + i];
  for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  /*
   * Merge the temp arrays back into arr[l..r]
   */
  i = 0;
  j = 0;
  k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];

      i++;
    } else {
      arr[k] = R[j];

      j++;
    }
    await render([...arr], [i + l, j + r - 1]);
    k++;
  }

  /*
   * Copy the remaining elements of L, if there are any
   */
  while (i < n1) {
    arr[k] = L[i];
    await render([...arr], [i + l, j + r - 1]);
    i++;
    k++;
  }

  /*
   * Copy the remaining elements of R, if there are any
   */
  while (j < n2) {
    arr[k] = R[j];
    await render([...arr], [i + l, j + r - 1]);
    j++;
    k++;
  }
  console.log(arr);
}