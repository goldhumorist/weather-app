import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}

  private cityLimit: number = 3;
  private citiesApiHeaders = {
    'X-Api-Key': environment.CITIES_API_KEY,
  };

  private citiesApiUrl = `https://api.api-ninjas.com/v1/city?limit=${this.cityLimit}&name=`;

  getCities$ = (city: string) => {
    return this.http
      .get<City[]>(`${this.citiesApiUrl}${city}`, {
        headers: this.citiesApiHeaders,
      })
      .pipe(map((cities) => cities.map((city) => city.name)));
  };
}
