export enum SearchFilter {
  latest = "latest",
  relevant = "relevant",
}

export interface SearchControlValues {
  searchKeywords: string;
  searchFilter: SearchFilter;
}
