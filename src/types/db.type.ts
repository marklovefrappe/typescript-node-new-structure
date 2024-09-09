/* eslint-disable @typescript-eslint/no-namespace */

export namespace User {
  export type createUser = {
    value: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      passwordConfirmation: string;
    };
  };

  export type findById = {
    id: string;
  };

  export type findByEmail = {
    email: string;
  };
}
