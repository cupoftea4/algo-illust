export type SortTypeId =
  | "bubble"
  | "selection"
  | "shell"
  | "quick"
  | "merge"
  | "counting"
  | null;

export type SortArray = (number | string | number[])[];

export type RenderFunc = (arr: SortArray, highlightedElements: number[]) => Promise<unknown>;

export type SortFunc = (
  arr: SortArray,
  render: RenderFunc,
  isASC: boolean
) => Promise<number>;
