
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      keyword: ['', [Validators.required, Validators.minLength(4)]],
      birth_date: ['', Validators.required],
      meals_per_day: ['', [Validators.required, Validators.min(4), Validators.max(7)]],
      allergies: [''],
      injuries: [''],
      gym_goal: ['', Validators.required],
      training_days: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      gender: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      neck: [''],
      shoulders: [''],
      chest: [''],
      waist: [''],
      hips: [''],
      thigh: [''],
      calf: ['']
    });
  }

  // Acceso rápido a los campos del formulario en el HTML
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.errorMessage = 'Formulario inválido. Revisa los campos obligatorios.';
      this.successMessage = '';
      return;
    }

    this.successMessage = 'Registro enviado con éxito.';
    this.errorMessage = '';
    console.log('Datos enviados:', this.registerForm.value);
  }
}
