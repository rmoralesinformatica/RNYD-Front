import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserDTO } from '../../Types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      keyword: ['', [Validators.required, Validators.minLength(4)]],
      birth_date: ['', Validators.required],
      meals_per_day: [
        null,
        [Validators.required, Validators.min(4), Validators.max(7)],
      ],
      allergies: [''],
      injuries: [''],
      gym_goal: [''],
      training_days: [
        null,
        [Validators.required, Validators.min(1), Validators.max(7)],
      ],
      gender: [''],
      weight: [null],
      height: [null],
      neck: [null],
      shoulders: [null],
      chest: [null],
      waist: [null],
      hips: [null],
      thigh: [null],
      calf: [null],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.registerForm.invalid) return;

    const user: UserDTO = {
      ...this.registerForm.value,
      role: 'USER', // hardcoded role
    };

    this.authService.register(user).subscribe({
      next: (res) => {
        localStorage.setItem('token', res);
        localStorage.setItem('email', this.registerForm.value.email);
        this.successMessage = 'Registro exitoso';
        this.registerForm.reset();
        this.submitted = false;
        console.log(res);
        // Redirect after 300ms
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 700);
      },
      error: (err) => {
        console.log('HTTP Error', err),
          (this.errorMessage = 'Error al registrar usuario');
      },
    });
  }
}
