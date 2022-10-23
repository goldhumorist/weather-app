import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimaryBtnComponent } from './primary-btn/primary-btn.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { BtnLinkComponent } from './btn-link/btn-link.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectCityFormComponent } from './select-city-form/select-city-form.component';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { BtnTogglerComponent } from './btn-toggler/btn-toggler.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    PrimaryBtnComponent,
    SubHeaderComponent,
    BtnLinkComponent,
    InputFieldComponent,
    SelectCityFormComponent,
    CustomLoaderComponent,
    NavbarComponent,
    HeaderComponent,
    BtnTogglerComponent,
    MatIconModule,
    MatSlideToggleModule,
  ],
  declarations: [
    PrimaryBtnComponent,
    SubHeaderComponent,
    BtnLinkComponent,
    InputFieldComponent,
    SelectCityFormComponent,
    CustomLoaderComponent,
    NavbarComponent,
    HeaderComponent,
    BtnTogglerComponent,
  ],
})
export class SharedModule {}
