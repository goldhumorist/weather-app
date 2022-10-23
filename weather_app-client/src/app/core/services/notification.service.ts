import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  showSuccessNotification = (message: string) => {
    Notiflix.Notify.success(message);
  };
  showFailedNotification = (message: string) => {
    Notiflix.Notify.failure(message);
  };
}
