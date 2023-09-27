export interface ResponseModule {
  message: string;
  method: string;
  result: { id_role: string; name: string }[];
  status: number;
}
