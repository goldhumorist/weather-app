import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  signup(signupData: any) {
    this.authService.signup(signupData).subscribe((value) => {
      this.router.navigate(['/login']);
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
