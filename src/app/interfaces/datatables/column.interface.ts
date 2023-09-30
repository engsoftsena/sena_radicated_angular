export interface InterfaceDataTableColumn {
  Field: string;
  Type: string;
  Collation: string | null;
  Null: string;
  Key: string;
  Default: string | null;
  Extra: string;
  Privileges: string;
  Comment: string;
  Label: string;
}
