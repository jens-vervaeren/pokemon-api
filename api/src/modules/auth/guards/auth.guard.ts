import { verify } from "jsonwebtoken"
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Observable } from "rxjs"

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const bearer = request.headers.authorization as string
    if (!bearer) return false

    const token = bearer.split(" ")[1]
    if (!token) return false

    try {
      verify(token, "secret")
      return true
    } catch (err) {
      return false
    }
  }
}
