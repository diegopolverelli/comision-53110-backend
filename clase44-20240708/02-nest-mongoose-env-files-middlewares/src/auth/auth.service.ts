import { CanActivate, ExecutionContext, Injectable, Query, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {}


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const request = context.switchToHttp().getRequest();
    
    let {email, password}=request.query
    if(email!="admin@test.com" || password!="Coder123"){
        throw new UnauthorizedException("Credenciales invalidas")
    }
    return true;


  }
}