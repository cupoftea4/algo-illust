import { SortArray } from "../types";

function isSorted(arr: SortArray, asc: boolean): boolean {
  if (Array.isArray(arr[0])) {
    let tempArr = [];
    for (let index = 0; index < arr.length; index++) {
      let element: number[] = <number[]>arr[index];
      tempArr.push(element[0]);
    }
    const len = tempArr.length;
    for (let i = 0; i < len - 1; i++) {
      if (
        (tempArr[i] > tempArr[i + 1] && asc) ||
        (tempArr[i] < tempArr[i + 1] && !asc)
      ) {
        return false;
      }
    }
    return true;
  } else {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      if ((arr[i] > arr[i + 1] && asc) || (arr[i] < arr[i + 1] && !asc)) {
        return false;
      }
    }
    return true;
  }
}

export default isSorted;
