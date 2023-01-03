import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenAdminGuard extends AuthGuard('jwt') {
    constructor(private jwtService: JwtService){
        super();
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        if (!token) throw new HttpException('You are not authorized to perform this action', 403);

        const user = this.decodeToken(token.split(' ')[1]);
        
        const hasAdminRole = user.roles.find(role => role['name'] === 'admin');

        if (!hasAdminRole) throw new HttpException('You are not authorized to perform this action', 403);
 
        return true;
    }

    decodeToken(token: string): { sub: number, username: string, roles: string[] } {
        const decodedToken = this.jwtService.decode(token);
        return decodedToken as { sub: number, username: string, roles: string[] };
    }
}