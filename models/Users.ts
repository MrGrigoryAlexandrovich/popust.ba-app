export interface IUsersState {
  readonly isLoading: boolean;
  readonly users: IUser[];
  readonly selectedUser?: IUser;
  readonly error: unknown;
}

export interface IUser {
  readonly _id: string;
  readonly title: string;
  readonly logo: string;
  readonly createdAt: string;
}
