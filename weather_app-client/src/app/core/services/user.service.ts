import { catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserSettingData } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import * as Notiflix from 'notiflix';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  private userSettingsApiUrl = `${environment.BASE_API_URL}/weather/settings`;

  changeUsersSettings(userSettingData: IUserSettingData) {
    return this.httpClient
      .post<IUserSettingData>(this.userSettingsApiUrl, userSettingData)
      .pipe(
        catchError((err) => {
          Notiflix.Notify.failure(
            'Something went wrong. Try to login one more time.'
          );
          throw err;
        })
      );
  }
}
