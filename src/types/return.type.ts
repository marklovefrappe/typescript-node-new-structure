/* eslint-disable @typescript-eslint/no-namespace */
import { DocumentType } from "@typegoose/typegoose";
import { User as UserClass } from "../db/models/user.model";

export namespace Test {
  export type HelloWorld = {
    hello: "world";
  };
}

export namespace Book {
  export type GetBook = {
    book: {
      book_id: number;
      book_name: string;
      book_genre: string;
    };
    author: {
      author_name: string;
    };
  };
}

export namespace Auth {
  export type AccessTokenPayload = {
    sessionId: string;
    email: string;
    firstName: string;
    lastName: string;
  };

  export type RefreshTokenPayload = {
    sessionId: string;
  };

  export type UserDocument = DocumentType<UserClass>;

  export type RequestToken = {
    access_token: string;
    refresh_token: string;
  };

  export type RefreshToken = {
    access_token: string;
    refresh_token: string;
  };
}
