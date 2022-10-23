import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let reqWithAuthToken = req;

    if (req.url.startsWith(environment.BASE_API_URL!)) {
      reqWithAuthToken = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.localStorageService.getAuthTokenFromLocalStorage()}`
        ),
      });
    }

    return next.handle(reqWithAuthToken);
  }
}
