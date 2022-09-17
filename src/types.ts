export type SortTypeId =
  | "bubble"
  | "selection"
  | "shell"
  | "quick"
  | "merge"
  | "counting"
  | null;

export type SortArray = (number | string | number[])[];

export type HighlightedElements = {
  green?: number[];
  orange?: number[];
  sorted?: boolean;
}

export type RenderFunc = (
  arr: SortArray, 
  highlightedElements: HighlightedElements
) => Promise<unknown>;

export type SortFunc = (
  arr: SortArray,
  render: RenderFunc,
  isASC: boolean
) => Promise<number>;
