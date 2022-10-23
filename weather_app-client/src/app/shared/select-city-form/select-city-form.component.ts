import { MatSlideToggle } from '@angular/material/slide-toggle';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ContentChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  switchMap,
  tap,
  catchError,
  EMPTY,
  takeUntil,
  Subject,
} from 'rxjs';
import { CityService } from 'src/app/core/services/city.service';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'app-select-city-form',
  templateUrl: './select-city-form.component.html',
  styleUrls: ['./select-city-form.component.scss'],
})
export class SelectCityFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(private cityService: CityService) {}

  @ViewChild(InputFieldComponent) child!: InputFieldComponent;
  private destroySubject$: Subject<void> = new Subject<void>();

  selectedCity!: string | null;
  cities: string[] = [];
  dataCityIsLoading: boolean = false;
  errorMsg: string = '';

  @Input() initialCity: string | null = null;
  @Output() saveUserSettingsEmitter: EventEmitter<{
    city: string;
    isNewsletter?: Boolean;
  }> = new EventEmitter();

  @ContentChild(MatSlideToggle) isNewsletter?: MatSlideToggle;

  ngOnInit() {
    this.selectedCity = this.initialCity;
  }

  ngAfterViewInit() {
    fromEvent(this.child.inputRef.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => {
          this.cities = [];
          this.errorMsg = '';
        }),
        filter((inputValue) => inputValue.trim()),
        tap(() => (this.dataCityIsLoading = true)),
        switchMap((inputValue: string) =>
          this.cityService.getCities$(inputValue).pipe(
            catchError((err) => {
              console.error('Error in API call', err);
              return EMPTY;
            })
          )
        ),
        tap(() => (this.dataCityIsLoading = false)),
        takeUntil(this.destroySubject$)
      )
      .subscribe((value) => {
        !value.length
          ? (this.errorMsg = 'Any city by your filter :(')
          : ((this.errorMsg = ''), (this.cities = value));
      });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.cities = [];
    this.child.inputRef.nativeElement.value = city;
  }

  saveUserSettings() {
    this.saveUserSettingsEmitter.emit({
      city: this.selectedCity!,
      isNewsletter: this.isNewsletter?.checked,
    });
  }
}
