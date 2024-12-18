export interface ICatalogsState {
  readonly isLoading: boolean;
  readonly catalogs: ICatalog[];
  readonly selectedCatalog?: ICatalog;
  readonly error: unknown;
}

export interface ICatalog {
  readonly _id: string;
  readonly title: string;
  readonly owner: string;
  readonly images: string[];
  readonly createdAt: Date;
  readonly startDate: string;
  readonly expiredDate: string;
}
