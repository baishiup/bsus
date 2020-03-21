import { API_STATUS } from '../interfaces';

export class HttpResponse {
  private message: string;
  private status: API_STATUS;
  private map: Record<string, any>;
  private list: Record<string, any> | Array<any>;

  constructor(
    message: HttpResponse['message'],
    status: HttpResponse['status'],
  ) {
    this.message = message;
    this.status = status;
  }
  public setList(list: HttpResponse['list']): this {
    this.list = list;
    return this;
  }
  public setMap(map: HttpResponse['map']): this {
    this.map = map;
    return this;
  }

  public static success(
    message = '操作成功',
    status = API_STATUS.SUCCESS,
  ): HttpResponse {
    return new HttpResponse(message, status);
  }
  public static error(
    message = '操作失败',
    status = API_STATUS.ERROR,
  ): HttpResponse {
    return new HttpResponse(message, status);
  }
}
