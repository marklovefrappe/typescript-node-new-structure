/* eslint-disable @typescript-eslint/no-namespace */

export namespace Test {
  export type helloWorld = {
    hello: "world";
  };
}

export namespace Book {
  export type getBook = {
    bookId: number;
  };
}

export namespace User {
  export type createUser = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirmation: string;
  };

  export type verifyUser = {
    id: string;
    code: string;
  };

  export type requestForgetPassword = {
    email: string;
  };

  export type confirmForgetPassword = {
    email: string;
    password: string;
    passwordConfirmation: string;
    passwordResetCode: string;
  };
}

export namespace Auth {
  export type requestToken = {
    email: string;
    password: string;
  };
  export type refreshToken = {
    sessionId: string;
  };
  export type revokeToken = {
    sessionId: string;
  };
}
