import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '../decorators/httpResponse';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(value => {
        if (value instanceof HttpResponse) {
          return value;
        } else if (value instanceof Array) {
          return HttpResponse.success().setList(value);
        } else if (value instanceof Object) {
          return HttpResponse.success().setMap(value);
        } else {
          return HttpResponse.success();
        }
      }),
    );
  }
}
