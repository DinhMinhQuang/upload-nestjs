import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log('request', request);
    return validateRequest(request);
  }
}

function validateRequest(request: any) {
  const { authorization } = request.headers;
  let test: any;
  try {
    test = verify(authorization, 'aaa');
  } catch (err) {
    console.log(err);
    return false;
  }
  console.log(test);
  return true;
}
