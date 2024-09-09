export type StatusCode = 400 | 401 | 404 | 500;

export type ErrorObj = {
  statusCode: StatusCode;
  errorResponse: {
    code: string;
    description: string;
  };
};
