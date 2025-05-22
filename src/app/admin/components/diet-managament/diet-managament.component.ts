import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: ' DietManagementComponent',
  templateUrl: './diet-management.component.html',
  styleUrls: ['./diet-management.component.scss']
})
export class DietManagementComponent implements OnInit {
  @Output() dietListUpdated = new EventEmitter<void>();

  dietForm!: FormGroup;
  diets: any[] = []; // Aquí irán las dietas cargadas
  editMode = false;
  selectedDietId: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dietForm = this.fb.group({
      diet_name: ['', Validators.required],
      note: [''],
      preferences: [''],
      allergies: [''],
      start_date: ['', Validators.required]
    });

    this.loadDiets();
  }

  loadDiets(): void {
    // Aquí vendría el servicio real
    this.diets = []; // Por ahora vacío
  }

  submit(): void {
    if (this.dietForm.invalid) return;

    if (this.editMode && this.selectedDietId !== null) {
      console.log('Editar dieta', this.dietForm.value);
    } else {
      console.log('Crear dieta', this.dietForm.value);
    }

    this.resetForm();
    this.dietListUpdated.emit(); // avisar al padre
  }

  editDiet(diet: any): void {
    this.editMode = true;
    this.selectedDietId = diet.diet_id;
    this.dietForm.patchValue(diet);
  }

  deleteDiet(id: number): void {
    console.log('Eliminar dieta con ID:', id);
    this.loadDiets();
  }

  resetForm(): void {
    this.dietForm.reset();
    this.editMode = false;
    this.selectedDietId = null;
  }
}
