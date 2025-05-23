import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
})
export class UserProgressComponent implements OnInit {
  progressHistory: any[] = [];
  weight: number = 0;
  height: number = 0;
  neck: number | null = null;
  shoulders: number | null = null;
  chest: number | null = null;
  waist: number | null = null;
  hips: number | null = null;
  thigh: number | null = null;
  calf: number | null = null;
  progressDate: string = '';
  selectedFile: File | null = null;
  modalRef: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProgressHistory();
  }

  loadProgressHistory(): void {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (!email) return;

    this.http
      .get<any[]>(`http://localhost:8080/progress/history/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 Add "Bearer " prefix
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (data) => {
          this.progressHistory = data;
          console.log('progress', this.progressHistory);
        },
        (error) => {
          if (error.status === 404) {
            this.progressHistory = [];
          }
        }
      );
  }

  openProgressModal(): void {
    this.weight = 0;
    this.height = 0;
    this.neck = null;
    this.shoulders = null;
    this.chest = null;
    this.waist = null;
    this.hips = null;
    this.thigh = null;
    this.calf = null;
    this.progressDate = '';
    this.selectedFile = null;

    const modalElement = document.getElementById('progressModal')!;
    this.modalRef = new bootstrap.Modal(modalElement);
    this.modalRef.show();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitProgress(): void {
    const email = localStorage.getItem('email');
    if (!email || !this.selectedFile) return;
    console.log('pase test');

    const formData = new FormData();
    formData.append('imageFile', this.selectedFile);
    formData.append('weight', this.weight.toString());
    formData.append('height', this.height.toString());
    formData.append('progressDate', this.progressDate);

        // Append the new fields if they are set
    if (this.neck !== null) formData.append('neck', this.neck.toString());
    if (this.shoulders !== null) formData.append('shoulders', this.shoulders.toString());
    if (this.chest !== null) formData.append('chest', this.chest.toString());
    if (this.waist !== null) formData.append('waist', this.waist.toString());
    if (this.hips !== null) formData.append('hips', this.hips.toString());
    if (this.thigh !== null) formData.append('thigh', this.thigh.toString());
    if (this.calf !== null) formData.append('calf', this.calf.toString());
    
    const token = localStorage.getItem('token');
    console.log('formData', this.weight.toString());
    this.http
      .post(`http://localhost:8080/progress/upload/${email}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
        },
        responseType: 'text' as 'json',
      })
      .subscribe(() => {
        this.modalRef.hide();
        this.loadProgressHistory();
      });
  }
}
