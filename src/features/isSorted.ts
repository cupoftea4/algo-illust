import { SortArray } from "../types";

const isSorted = (arr: SortArray, asc: boolean) => {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        if ((arr[i] > arr[i + 1] && asc) || (arr[i] < arr[i + 1] && !asc)) {
            return false;
        }
    }
    return true;
};

export default isSorted;