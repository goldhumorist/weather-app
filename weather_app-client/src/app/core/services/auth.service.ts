import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import {
  IUserLoginData,
  IUserData,
  IUserSignupData,
} from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  private apiAuthUrl = `${environment.BASE_API_URL}/auth`;

  login(loginUserData: IUserLoginData): Observable<IUserData> {
    return this.httpClient
      .post<IUserData>(`${this.apiAuthUrl}/login`, loginUserData)
      .pipe(
        catchError((err) => {
          const loginFailureMessage = err.error.message || 'login failed';
          this.notificationService.showFailedNotification(loginFailureMessage);
          throw err;
        })
      );
  }

  signup(signupUserData: IUserSignupData): Observable<{ message: string }> {
    return this.httpClient
      .post<{ message: string }>(`${this.apiAuthUrl}/signup`, signupUserData)
      .pipe(
        tap((resultOfSignup) => {
          this.notificationService.showSuccessNotification(
            resultOfSignup.message
          );
        }),
        catchError((err) => {
          this.notificationService.showFailedNotification(err?.error?.message);
          return EMPTY;
        })
      );
  }

  verifyAccount(authToken: string): Observable<{ message: string }> {
    return this.httpClient
      .get<{ message: string }>(`${this.apiAuthUrl}/verify/${authToken}`)
      .pipe(
        tap(() => {
          this.notificationService.showSuccessNotification(
            'Your account was verified!'
          );
        }),
        catchError((err) => {
          this.notificationService.showFailedNotification(
            'Something went wrong'
          );
          throw err;
        })
      );
  }

  checkUserAuth() {
    return this.httpClient.get<IUserData>(`${this.apiAuthUrl}`).pipe(
      catchError((err) => {
        this.notificationService.showFailedNotification('Unauthorized access');
        throw err;
      })
    );
  }
}
