import { webSocket } from 'rxjs/webSocket';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private localStorageService: LocalStorageService) {}

  private getToken = this.localStorageService.getAuthTokenFromLocalStorage;
  private wsUrl = `${environment.WS_URL}token=${this.getToken()}`;

  websocketSubject$ = webSocket(this.wsUrl);
}
