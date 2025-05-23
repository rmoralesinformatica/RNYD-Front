import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Diet, UserDTO, Workout } from '../../Types';
import * as bootstrap from 'bootstrap';
import { DietService } from '../../core/services/diet.service';
import { WorkoutService } from '../../core/services/workout.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  users: UserDTO[] = [];
  availableDiets: Diet[] = [];
  selectedUserEmail: string = '';
  selectedDietId: number | null = 0;
  editForm: FormGroup;
  modalRef: any;
  assignModalRef: any;
  activeTab: string = 'users';
  availableWorkouts: Workout[] = [];
  selectedWorkoutId: number = 0;
  workoutModalRef: any;
  userModalRef: any;
  selectedUserDetails: any = null;
  gymGoalFilter: string = '';
  subscriptionFilter: string = '';
  gymGoals: string[] = [
    'LOSE_WEIGHT',
    'GAIN_MUSCLE',
    'MAINTAIN_FITNESS',
    'IMPROVE_ENDURANCE',
  ];
  subscriptions: string[] = ['Dieta', 'Entrenamiento', 'Dieta y Entrenamiento'];
  filteredUsers: UserDTO[] = [];
  genders: string[] = ['HOMBRE', 'MUJER', 'OTRO'];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private dietService: DietService,
    private workoutService: WorkoutService
  ) {
    this.editForm = this.fb.group({
      name: [''],
      surname: [''],
      birth_date: [''],
      gender: [''],
      meals_per_day: [''],
      allergies: [''],
      injuries: [''],
      gym_goal: [''],
      training_days: [''],
      weight: [''],
      height: [''],
      neck: [''],
      shoulders: [''],
      chest: [''],
      waist: [''],
      hips: [''],
      thigh: [''],
      calf: [''],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadDiets();
    this.loadWorkouts();
  }

  loadUsers(): void {
    const token = localStorage.getItem('token');
    this.http
      .get<UserDTO[]>('http://localhost:8080/user', {
        headers: {
          Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
          'Content-Type': 'application/json',
        },
      })
      .subscribe((users) => {
        this.users = users.filter((user) => user.role === 'USER');
        this.filteredUsers = this.users;
      });
  }

  loadDiets(): void {
    this.dietService.getAll().subscribe((diets) => {
      this.availableDiets = diets;
    });
  }

  openEditModal(user: UserDTO): void {
    this.selectedUserEmail = user.email;
    this.editForm.patchValue(user);
    const modalElement = document.getElementById('editUserModal')!;
    this.modalRef = new bootstrap.Modal(modalElement);
    this.modalRef.show();
  }

  submitEdit(): void {
    const token = localStorage.getItem('token');
    const email = this.selectedUserEmail;
    const updatedUser = this.editForm.value;
    console.log('selectedEmail', this.selectedUserEmail);

    console.log(updatedUser);

    this.http
      .patch(`http://localhost:8080/user/${email}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        responseType: 'text' as 'json',
      })
      .subscribe(() => {
        this.selectedUserEmail;
        this.modalRef.hide();
        this.loadUsers();
      });
  }

  deleteUser(email: string): void {
    const token = localStorage.getItem('token');
    if (confirm(`¿Estás seguro de eliminar a ${email}?`)) {
      this.http
        .delete(`http://localhost:8080/user/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
            'Content-Type': 'application/json',
          },
          responseType: 'text' as 'json', // <-- 🛠 Important fix here
        })
        .subscribe({
          next: () => {
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error deleting user:', err);
          },
        });
    }
  }

  openAssignDietModal(email: string): void {
    this.selectedUserEmail = email;
    this.selectedDietId = this.availableDiets[0]?.id ?? 0;

    const modalElement = document.getElementById('assignDietModal')!;
    this.assignModalRef = new bootstrap.Modal(modalElement);
    this.assignModalRef.show();
  }

  assignDietToUser(): void {
    // const selectedDiet = this.availableDiets.find(
    //   (d) => d.id == this.selectedDietId
    // );
    const selectedDiet = this.selectedDietId
    if (!selectedDiet) return;
   console.log('selectedDiet', this.selectedDietId);
    this.dietService
      .assignDiet(this.selectedUserEmail, selectedDiet)
      .subscribe(() => {
        alert('Dieta asignada exitosamente');
        this.assignModalRef.hide();
      });
  }

  //Workouts

  loadWorkouts(): void {
    this.workoutService
      .getAll()
      .subscribe((workouts) => (this.availableWorkouts = workouts));
  }

  openAssignWorkoutModal(email: string): void {
    this.selectedUserEmail = email;
    this.selectedWorkoutId = this.availableWorkouts[0]?.workout_id ?? 0;

    const modalElement = document.getElementById('assignWorkoutModal')!;
    this.workoutModalRef = new bootstrap.Modal(modalElement);
    this.workoutModalRef.show();
  }

  assignWorkoutToUser(): void {
    // const selectedWorkout = this.availableWorkouts.find(
    //   (w) => w.workout_id == this.selectedWorkoutId
    // );
    const selectedWorkout = this.selectedWorkoutId;

    if (!selectedWorkout) return;

    this.workoutService
      .assignWorkout(this.selectedUserEmail, selectedWorkout)
      .subscribe(() => {
        alert('Rutina asignada exitosamente');
        this.workoutModalRef.hide();
      });
  }

  //User Details

  viewUserDetails(email: string): void {
    const token = localStorage.getItem('token');
    this.http
      .get(`http://localhost:8080/user/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
          'Content-Type': 'application/json',
        },
      })
      .subscribe((user) => {
        this.selectedUserDetails = user;
        const modalElement = document.getElementById('userDetailsModal')!;
        this.userModalRef = new bootstrap.Modal(modalElement);
        this.userModalRef.show();
      });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter((user) => {
      const matchesGoal = this.gymGoalFilter
        ? user.gym_goal === this.gymGoalFilter
        : true;
      const matchesSubscription = this.subscriptionFilter
        ? user.subscription_name === this.subscriptionFilter
        : true;
      return matchesGoal && matchesSubscription;
    });
  }

  resetFilters(): void {
    this.gymGoalFilter = '';
    this.subscriptionFilter = '';
    this.filteredUsers = this.users;
  }
}
