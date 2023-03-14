import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, filter, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token = localStorage.getItem('jwt');
    if (token){

      token = token.slice(1,-1);
    }
    // console.log(token);
    // console.log("end token");
    if (token) {
      // console.log("token true");
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    } else{
      // console.log("token false");
    }
    return next.handle(request);
  }
}