declare global {
    interface Array<T> {
      isSorted(): boolean;
    }
  }
  
  Array.prototype.isSorted = function (): boolean {
    const arr: number[] = this;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
  }

  export default Array;