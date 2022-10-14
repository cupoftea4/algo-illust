type SearchArray = string | number[];

export const binarySearch = async (arr: SearchArray, target: number | string, render: Function): Promise<[number | null, number]> => {
  let start = 0;
  let end = arr.length - 1;
  let steps = 0;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    steps++;
    await render(mid);
    if (arr[mid] === target) {
      return [mid, steps];
    } else if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return [null, steps];
};

export const kmpSearch = async (str: string, target: string, render: Function): Promise<[number | null, number]> => {
  const lps = getLps(target);
  let i = 0;
  let j = 0;
  let steps = 0;
  while (i < str.length) {
    steps++;
    await render(i);
    if (str[i] === target[j]) {
      i++;
      j++;
      if (j === target.length) {
        return [i - j, steps];
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }
  return [null, steps];
}

export const bmSearch = async (str: string, target: string, render: Function): Promise<[number | null, number]> => {
  const badChar = getBadChar(target);
  const goodSuffix = getGoodSuffix(target);
  let i: number = 0;
  let steps = 0;
  while (i <= str.length - target.length) {
    steps++;
    await render(i);
    let j: number = target.length - 1;
    while (j >= 0 && target[j] === str[i + j]) {
      j--;
    }
    if (j < 0) {
      return [i, steps];
    } else {
      i += Math.max(goodSuffix[j], j - badChar[str[i + j].charCodeAt(0)]);
    }
  }
  return [null, steps];
}

const getBadChar = (target: string): number[] => {
  const badChar = new Array(256).fill(-1);
  for (let i = 0; i < target.length; i++) {
    badChar[target.charCodeAt(i)] = i;
  }
  return badChar;
}

const getGoodSuffix = (target: string): number[] => {
  const goodSuffix = new Array(target.length).fill(target.length);
  const lps = getLps(target);
  for (let i = target.length - 1; i >= 0; i--) {
    if (lps[i] === i + 1) {
      for (let j = 0; j < target.length - 1 - i; j++) {
        if (goodSuffix[j] === target.length) {
          goodSuffix[j] = target.length - 1 - i;
        }
      }
    }
  }
  for (let i = 0; i < target.length - 1; i++) {
    goodSuffix[target.length - 1 - lps[i]] = target.length - 1 - i;
  }
  return goodSuffix;
}

const getLps = (target: string): number[] => {
  const lps = new Array(target.length).fill(0);
  let i = 1;
  let j = 0;
  while (i < target.length) {
    if (target[i] === target[j]) {
      lps[i] = j + 1;
      i++;
      j++;
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }
  return lps;
}
