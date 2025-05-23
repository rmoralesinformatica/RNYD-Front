import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { DietService } from '../../../core/services/diet.service';
import { Diet, UserDTO } from '../../../Types';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-diet-management',
  templateUrl: './diet-management.component.html',
  styleUrl: './diet-management.component.scss',
})
export class DietManagementComponent implements OnInit {
  @Output() dietListUpdated = new EventEmitter<void>();
  diets: Diet[] = [];
  dietForm: FormGroup;
  isEditing = false;
  currentDietId: number | null = null;
  modalRef: any;
  selectedFile: File | null = null;
  users: UserDTO[] = [];
  selectedUserEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private dietService: DietService,
    private userService: UserService
  ) {
    this.dietForm = this.fb.group({
      diet_name: [''],
      start_date: ['', [Validators.required, this.futureDateValidator]],
      note: [''],
      preferences: [''],
      allergies: [''],
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
    this.loadDiets();
    this.loadUsers();
  }

  loadDiets(): void {
    this.dietService
      .getAll()
      .subscribe(
        (data) => (this.diets = data.sort((a, b) => a.diet_id - b.diet_id))
      );
  }

  private loadUsers(): void {
    this.userService
      .getAllUsers()
      .subscribe(
        (users) => (this.users = users.filter((user) => user.role === 'USER'))
      );
  }

  filterDietsByUser(): void {
    this.dietService.getAll(this.selectedUserEmail).subscribe((data) => {
      this.diets = data.sort((a, b) => a.diet_id - b.diet_id);
    });
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.dietForm.reset();
    this.resetFileInput();
    this.showModal();
  }

  resetFileInput(): void {
    const fileInput =
      document.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
    this.selectedFile = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('Por favor, selecciona un archivo PDF válido.');
    }
  }

  openEditModal(diet: Diet): void {
    this.isEditing = true;
    this.currentDietId = diet.diet_id;
    this.dietForm.patchValue(diet);
    this.resetFileInput();
    this.showModal();
  }

  submitDiet(): void {
    if (!this.dietForm.valid) {
      alert('Por favor, completa todos los campos y adjunta un PDF.');
      return;
    }

    const formData = new FormData();

    const now = new Date();

    const dietDTO: any = {
      ...this.dietForm.value,
      start_date: new Date(this.dietForm.value.start_date)
        .toISOString()
        .split('T')[0],
      created_at: now.toISOString().split('.')[0],
    };

    // // If editing, include diet_id
    // if (this.isEditing && this.currentDietId != null) {
    //   dietDTO.diet_id = Number(this.currentDietId); // 🔁 Force it to be a number
    // }

    console.log('Sending dietDTO:', dietDTO);
    console.log('dietPdfFile', this.selectedFile);

    formData.append(
      'dietDTO',
      new Blob([JSON.stringify(dietDTO)], { type: 'application/json' })
    );
    if (this.selectedFile) {
      formData.append('dietPdfFile', this.selectedFile);
    }
    console.log('Selected file type:', typeof this.selectedFile);
    console.log('Is File?', this.selectedFile instanceof File);

    console.log('Final FormData entries:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    if (this.isEditing && this.currentDietId != null) {
      this.dietService.update(formData, this.currentDietId).subscribe(() => {
        this.modalRef.hide();
        this.loadDiets();
        this.dietListUpdated.emit();
        this.selectedFile = null;
        this.isEditing = false;
      });
    } else {
      this.dietService.create(formData).subscribe(() => {
        this.modalRef.hide();
        this.loadDiets();
        this.dietListUpdated.emit();
        this.selectedFile = null;
      });
    }
  }

  deleteDiet(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta dieta?')) {
      this.dietService.delete(id).subscribe(() => this.loadDiets());
    }
  }

  private showModal(): void {
    const modalElement = document.getElementById('dietModal')!;
    this.modalRef = new bootstrap.Modal(modalElement);
    this.modalRef.show();
  }
}
