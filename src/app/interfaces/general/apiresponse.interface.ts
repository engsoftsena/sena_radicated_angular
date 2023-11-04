export interface ApiResponse {
  data: Array<{ id_register: string; os_name: string }>;
  headers: { [key: string]: string[] };
  method: string;
  query_params: { [key: string]: string };
  request_body: string;
  uri: string;
}
