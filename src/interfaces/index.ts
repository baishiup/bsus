export enum API_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum PublishState {
  PUBLISH = '1',
  DRAFT = '2',
}

export type jenkinsArgs = {
  DBusername: string;
  DBpassword: string;
  database: string;
  ak: string;
  sk: string;
  bucket: string;
};
