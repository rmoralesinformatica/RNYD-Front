import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    // if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email;
    const keyword = this.loginForm.value.password;

    this.authService.login(email, keyword).subscribe({
      next: (res) => {
        console.log('entre');
        localStorage.setItem('token', res);
        localStorage.setItem('email', email);
        this.router.navigate(['/admin']);
      },
      error: () => {
        alert('Invalid login credentials');
      },
    });
  }
}
