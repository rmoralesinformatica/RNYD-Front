import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { WorkoutService } from '../../../core/services/workout.service';
import { UserDTO, Workout } from '../../../Types';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-workout-management',
  templateUrl: './workout-management.component.html',
})
export class WorkoutManagementComponent implements OnInit {
    @Output() workoutListUpdated = new EventEmitter<void>();
  workouts: Workout[] = [];
  users: UserDTO[] = [];
  workoutForm: FormGroup;
  isEditingWorkout = false;
  currentWorkoutId: number | null = null;
  selectedFile: File | null = null;
  workoutModalRef: any;
  selectedUserEmail: string = '';
  
  constructor(private fb: FormBuilder, private workoutService: WorkoutService,  private userService: UserService) {
    this.workoutForm = this.fb.group({
      workout_name: [''],
      note: [''],
      start_date: ['', [Validators.required, this.futureDateValidator]],
    });
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Clear time portion for accurate comparison

    if (selectedDate < today) {
      return { futureDate: 'La fecha de inicio no puede ser anterior a hoy' };
    }

    return null;
  }
  ngOnInit(): void {
    this.loadWorkouts();
    this.loadUsers();
  }

  loadWorkouts(): void {
    this.workoutService
      .getAll()
      .subscribe(
        (data) =>
          (this.workouts = data.sort((a, b) => a.workout_id - b.workout_id))
      );
  }

    loadUsers(): void {
    this.userService
      .getAllUsers()
      .subscribe((users) => (this.users = users.filter((user) => user.role === 'USER')));
  }

    filterWorkoutsByUser(): void {
    this.workoutService.getAll(this.selectedUserEmail).subscribe((data) => {
      this.workouts = data.sort((a, b) => a.workout_id - b.workout_id);
    });
  }

  openCreateWorkoutModal(): void {
    this.isEditingWorkout = false;
    this.workoutForm.reset();
    this.selectedFile = null;
    this.resetFileInput();
    this.showWorkoutModal();
  }

  resetFileInput(): void {
    const fileInput =
      document.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
    this.selectedFile = null;
  }

  openEditWorkoutModal(workout: Workout): void {
    this.isEditingWorkout = true;
    this.currentWorkoutId = workout.workout_id;
    this.workoutForm.patchValue({
      workout_name: workout.workout_name,
      note: workout.note,
      start_date: workout.start_date,
    });
    this.selectedFile = null;
    this.resetFileInput();
    this.showWorkoutModal();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('Por favor, selecciona un archivo PDF válido.');
    }
  }

  submitWorkout(): void {
    if (
      !this.workoutForm.valid ||
      (!this.selectedFile && !this.isEditingWorkout)
    ) {
      alert('Completa todos los campos y adjunta un PDF.');
      return;
    }

    const now = new Date();

    const workoutDTO: any = {
      ...this.workoutForm.value,
      start_date: new Date(this.workoutForm.value.start_date)
        .toISOString()
        .split('T')[0],
      created_at: now.toISOString().split('.')[0],
    };

    if (this.isEditingWorkout && this.currentWorkoutId != null) {
      workoutDTO.workout_id = this.currentWorkoutId;
    }

    const formData = new FormData();
    formData.append(
      'workoutDTO',
      new Blob([JSON.stringify(workoutDTO)], { type: 'application/json' })
    );

    if (this.selectedFile) {
      formData.append('workoutPdf', this.selectedFile);
    }

    const request$ =
      this.isEditingWorkout && this.currentWorkoutId != null
        ? this.workoutService.update(formData, this.currentWorkoutId)
        : this.workoutService.create(formData);

    request$.subscribe(() => {
      this.loadWorkouts();
      this.workoutListUpdated.emit()
      this.workoutModalRef.hide();
      this.selectedFile = null;
      this.isEditingWorkout = false;
    });
  }

  deleteWorkout(id: number): void {
    if (confirm('¿Eliminar esta rutina?')) {
      this.workoutService.delete(id).subscribe(() => this.loadWorkouts());
    }
  }

  private showWorkoutModal(): void {
    const el = document.getElementById('workoutModal')!;
    this.workoutModalRef = new bootstrap.Modal(el);
    this.workoutModalRef.show();
  }
}
