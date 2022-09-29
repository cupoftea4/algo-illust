import { SortArray, SortTypeId } from "../types";
import isSorted from "./isSorted";

export const bubbleSort = async (
  arr: SortArray,
  render: (arr: SortArray, swaps: number[]) => void,
  wait: Function,
  isAsc: boolean
) => {
  const len = arr.length;
  let steps = 0;
  let checked;
  do {
    checked = false;
    for (let i = 0; i < len; i++) {
      if ((arr[i] > arr[i + 1] && isAsc) || (arr[i] < arr[i + 1] && !isAsc)) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        render([...arr], [i, i + 1]);
        await wait();
        checked = true;
        steps++;
      }
    }
  } while (checked);
  return steps;
};

export const selectionSort = async (
  arr: SortArray,
  render: (arr: SortArray, swaps: number[]) => void,
  wait: Function,
  isAsc: boolean
) => {
  const len = arr.length;
  let steps = 0;
  for (let i = 0; i < len; i++) {
    let control = i;
    for (let j = i + 1; j < len; j++) {
      if (
        (arr[j] < arr[control] && isAsc) ||
        (arr[j] > arr[control] && !isAsc)
      ) {
        control = j;
      }
    }
    if (i !== control) {
      [arr[i], arr[control]] = [arr[control], arr[i]];
      render([...arr], [i, control]);
      await wait();
      steps++;
    }
  }
  return steps;
};

export const shellSort = async (
  arr: SortArray,
  render: (arr: SortArray, swaps: number[]) => void,
  wait: Function,
  isAsc: boolean
) => {
  const len = arr.length;
  let steps = 0;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let temp = arr[i];
      let j;
      for (
        j = i;
        j >= gap &&
        ((arr[j - gap] > temp && isAsc) || (arr[j - gap] < temp && !isAsc));
        j -= gap
      ) {
        arr[j] = arr[j - gap];

        render([...arr], [j, j - gap]);
        await wait();
        console.log(arr);
        steps++;
      }
      arr[j] = temp;
      console.log(arr);
      render([...arr], []);
      await wait();
    }
  }
  return steps;
};

export const countingSort = async (
  arr: number[],
  render: (arr: SortArray, swaps: number[]) => void,
  wait: Function
) => {
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
    console.log(sorted);

    await wait();
  }
  return sorted;
};

export const quickSort: Function = async (
  arr: number[],
  render: Function,
  wait: Function
) => {
  console.log(arr);
  await quickSortLocal(arr, 0, arr.length - 1, render, wait);
  return 0;
};

async function swap(
  items: number[] | number[][],
  leftIndex: number,
  rightIndex: number,
  render: Function,
  wait: Function
) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  console.log(items);
  render([...items], [leftIndex, rightIndex]);
  await wait();
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
  items: number[] | number[][],
  left: number,
  right: number,
  render: Function,
  wait: Function
) {
  if (Array.isArray(items[0])) {
    let matrix = [...(items as number[][])];
    let pivot = matrix[Math.floor((right + left) / 2)][0]; //middle elemen
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
        await swap(items, i, j, render, wait); //sawpping two elements
        i++;
        j--;
      }
    }

    return i;
  } else {
    var pivot = items[Math.floor((right + left) / 2)]; //middle element
    console.log(pivot);

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
        await swap(items, i, j, render, wait); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }
}

async function quickSortLocal(
  items: number[] | Array<number[]>,
  left: number,
  right: number,
  render: Function,
  wait: Function
) {
  let index;
  if (items.length > 1 && !isSorted(items, true)) {
    index = await partition(items, left, right, render, wait); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await quickSortLocal(items, left, index - 1, render, wait);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await quickSortLocal(items, index, right, render, wait);
    }
  }
  return items;
}

/* Iterative javascript program for merge sort */

/*
 * Iterative mergesort function to sor t arr[0...n-1]
 */
export async function mergeSort(
  arr: number[],
  render: Function,
  wait: Function
) {
  // For current size of subarrays to
  // be merged curr_size varies from
  // 1 to n/2
  console.log(arr);
  let n = arr.length;
  var curr_size;

  // For picking starting index of
  // left subarray to be merged
  var left_start;

  // Merge subarrays in bottom up
  // manner. First merge subarrays
  // of size 1 to create sorted
  // subarrays of size 2, then merge
  // subarrays of size 2 to create
  // sorted subarrays of size 4, and
  // so on.
  for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
    // Pick starting point of different
    // subarrays of current size
    for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
      // Find ending point of left
      // subarray. mid+1 is starting
      // point of right
      var mid = Math.min(left_start + curr_size - 1, n - 1);

      var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

      // Merge Subarrays arr[left_start...mid]
      // & arr[mid+1...right_end]
      await merge(arr, left_start, mid, right_end, render, wait);
    }
  }
  return 0;
}

/*
 * Function to merge the two haves arr[l..m] and arr[m+1..r] of array arr
 */
async function merge(
  arr: number[],
  l: number,
  m: number,
  r: number,
  render: Function,
  wait: Function
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
    render([...arr], [i + l, j + r - 1]);
    await wait();
    k++;
  }

  /*
   * Copy the remaining elements of L, if there are any
   */
  while (i < n1) {
    arr[k] = L[i];
    render([...arr], [i + l, j + r - 1]);
    await wait();
    i++;
    k++;
  }

  /*
   * Copy the remaining elements of R, if there are any
   */
  while (j < n2) {
    arr[k] = R[j];
    render([...arr], [i + l, j + r - 1]);
    await wait();
    j++;
    k++;
  }
  console.log(arr);
}
