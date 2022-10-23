import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IUserLoginData } from 'src/app/shared/interfaces';

function passwordMatcher(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const password = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (password?.pristine || confirmPassword?.pristine) return null;

  if (password?.value === confirmPassword?.value) return null;

  return { match: true };
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  signupForm!: FormGroup;
  @Output() signupFormEmmiter = new EventEmitter();

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.formBuilder.group(
        {
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', Validators.required],
        },
        { validator: passwordMatcher }
      ),
    });
  }

  submitForm() {
    const signupData = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.passwordGroup.password,
    };
    this.signupFormEmmiter.emit(signupData);
  }
}
