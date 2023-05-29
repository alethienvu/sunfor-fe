export interface IAlert {
  message: any;
  type: AlertType;
}
export enum AlertType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info'
}
