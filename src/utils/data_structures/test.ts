import { DSArray, DSArrayElement, DSStats } from "../types/ds.types";
import { DSClass } from "../types/ds.types";

export default function testDS(array: DSArray, toFind: DSArrayElement, DSType: DSClass) {
  console.log("Running test for", DSType.name);
  const ds = new DSType(array);
  const randDS = new DSType(Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)));
  return {
    length: ds.length,
    min: ds.findMin(),
    elBeforeMin: ds.find((ds.findIndex(ds.findMin()) || 0) - 1),
    max: ds.findMax(),
    elAfterMax: ds.find((ds.findIndex(ds.findMax()) || ds.length) + 1),
    searchValue: toFind,
    foundIndex: ds.findIndex(toFind),
    secondFromStart: ds.find(1),
    thirdFromEnd: ds.find(ds.length - 3),
    mergedArray: ds.merge(randDS as any)
  } as DSStats;
}

