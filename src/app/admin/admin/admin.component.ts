import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  activeTab = 'users';

  // Filtros
  gymGoals = ['GAIN_MUSCLE', 'LOSE_WEIGHT', 'MAINTAIN_FITNESS', 'IMPROVE_ENDURANCE'];
  subscriptions = ['Básico', 'Intermedio', 'Avanzado']; // Puedes ajustar esto luego con datos reales
  gymGoalFilter = '';
  subscriptionFilter = '';

  // Usuarios
  users: any[] = []; // Aquí irá la lista completa
  filteredUsers: any[] = []; // Lista filtrada para mostrar

  // Formularios
  editForm!: FormGroup;

  // Géneros
  genders = ['HOMBRE', 'MUJER', 'OTRO'];

  // Para asignaciones
  availableDiets: any[] = [];
  availableWorkouts: any[] = [];
  selectedDietId = 0;
  selectedWorkoutId = 0;
  selectedUserDetails: any = null;

 constructor(private fb: FormBuilder, private userService: UserService) {}


  ngOnInit(): void {
    this.editForm = this.fb.group({
      email: [''],
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
      calf: ['']
    });

    // Aquí cargarás datos cuando tengas el servicio
    this.loadUsers();
    this.loadDiets();
    this.loadWorkouts();
  }

 loadUsers(): void {
  this.userService.getAllUsers().subscribe({
    next: (res) => {
      this.users = res;
      this.filteredUsers = res;
    },
    error: () => {
      console.error('Error al cargar los usuarios');
    },
  });
}


  loadDiets(): void {
    this.availableDiets = []; // luego del servicio
  }

  loadWorkouts(): void {
    this.availableWorkouts = []; // luego del servicio
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesGoal = this.gymGoalFilter ? user.gym_goal === this.gymGoalFilter : true;
      const matchesSub = this.subscriptionFilter ? user.subscription_name === this.subscriptionFilter : true;
      return matchesGoal && matchesSub;
    });
  }

  resetFilters(): void {
    this.gymGoalFilter = '';
    this.subscriptionFilter = '';
    this.filteredUsers = this.users;
  }

  openEditModal(user: any): void {
    this.editForm.patchValue(user);
    // Aquí abrirías el modal con JS puro o Bootstrap
  }

 submitEdit(): void {
  const updatedUser = this.editForm.value;
  this.userService.updateUser(updatedUser).subscribe({
    next: () => {
      this.loadUsers();
    },
    error: () => {
      console.error('Error al actualizar el usuario');
    },
  });
}


  deleteUser(email: string): void {
  this.userService.deleteUser(email).subscribe({
    next: () => {
      this.loadUsers(); // recarga la lista
    },
    error: () => {
      console.error('Error al eliminar el usuario');
    },
  });
}


  openAssignDietModal(email: string): void {
    console.log('Asignar dieta a:', email);
  }

assignDietToUser(): void {
  this.userService.assignDiet(this.editForm.value.email, this.selectedDietId).subscribe({
    next: () => {
      this.loadUsers();
    },
    error: () => {
      console.error('Error al asignar dieta');
    },
  });
}


  openAssignWorkoutModal(email: string): void {
    console.log('Asignar rutina a:', email);
  }

assignWorkoutToUser(): void {
  this.userService.assignWorkout(this.editForm.value.email, this.selectedWorkoutId).subscribe({
    next: () => {
      this.loadUsers();
    },
    error: () => {
      console.error('Error al asignar rutina');
    },
  });
}


viewUserDetails(email: string): void {
  this.userService.getUserDetails(email).subscribe({
    next: (res) => {
      this.selectedUserDetails = res;
    },
    error: () => {
      console.error('Error al obtener detalles del usuario');
    },
  });
}

