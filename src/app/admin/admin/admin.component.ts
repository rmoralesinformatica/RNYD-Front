import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  activeTab = 'users';

  // Formulario vacío para evitar errores hasta que se implemente la lógica real
  editForm: FormGroup = this.fb.group({});

  // Datos simulados o vacíos para evitar errores
  gymGoals: string[] = [];
  subscriptions: string[] = [];
  filteredUsers: any[] = [];

  genders: string[] = ['HOMBRE', 'MUJER', 'OTRO'];
  selectedDietId = 0;
  selectedWorkoutId = 0;
  selectedUserDetails: any = null;

  constructor(private fb: FormBuilder) {}

  // Métodos vacíos para evitar errores de binding
  filterUsers() {}
  resetFilters() {}
  openEditModal(user: any) {}
  deleteUser(email: string) {}
  openAssignDietModal(email: string) {}
  assignDietToUser() {}
  openAssignWorkoutModal(email: string) {}
  assignWorkoutToUser() {}
  viewUserDetails(email: string) {}
  loadDiets() {}
  loadWorkouts() {}
}




  



 
  


