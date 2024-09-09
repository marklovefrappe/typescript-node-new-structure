export type SignToken = {
  payload: object;
  type?: "sym" | "asym";
  expireTime?: string;
};

export type Verifytoken = {
  type?: "sym" | "asym";
  token: string;
};
