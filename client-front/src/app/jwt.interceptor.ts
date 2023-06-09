import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, EMPTY, Observable, Subject, switchMap, tap, throwError} from 'rxjs';
import { AuthService } from './Service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    isRefreshing: boolean = false;
    accessTokenRefreshed: Subject<any> = new Subject();

    constructor(private authService: AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // Handle the request
        request = this.addAuthHeader(request);

        // call next() and handle the response
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {

                if(this.authService.getRefreshToken()){
                    if (error.status === 401) {
                        // refresh the access token
                        return this.refreshAccessToken()
                            .pipe(
                                switchMap(() => {
                                    request = this.addAuthHeader(request);
                                    return next.handle(request);
                                }),
                                catchError((err: any) => {
                                    this.authService.logoutUser();
                                    return EMPTY;
                                })
                            )
                    }}
                return throwError(() => error);
            })
        );
    }

    refreshAccessToken() {
        if (this.isRefreshing) {   // si le token est valide
            return new Observable(observer => {
                this.accessTokenRefreshed.subscribe(() => {
                    // this code will run when the access token has been refreshed
                    observer.next();
                    observer.complete();
                });
            });
        } else {
            this.isRefreshing = true;   // si le token est invalide
            // we want to call a method in the auth service to send a request to refresh the access token
            return this.authService.getNewToken().pipe(
                tap(() => {
                    console.log('Access Token Refreshed!');
                    this.isRefreshing = false;
                    // @ts-ignore
                    this.accessTokenRefreshed.next();
                })
            );
        };
    }

    addAuthHeader(request: HttpRequest<any>) {
        // get the access token
        const token = this.authService.getToken();

        if (token) {
            // append the access token to the request header
            return request.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + token
                }
            })
        }
        return request;
    }
}
