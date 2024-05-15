export interface APIResponseError {
  title: string;
  statusCode: number;
  success: boolean;
  result: string | string[] | null;
}
