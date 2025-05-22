import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../core/services/subscription.service';
import { Subscription, UserDTO } from '../../Types';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  userDetails: any = null;
  activeTab: String = 'details';
  isSubscribedUser: boolean = false;
  allSubscriptions: Subscription[] = [];
  subscriptionType: 'entrenamiento' | 'dieta' | 'completo' | null = null;
  editForm: FormGroup;
  modalRef: any;
  gymGoals: string[] = [
    'LOSE_WEIGHT',
    'GAIN_MUSCLE',
    'MAINTAIN_FITNESS',
    'IMPROVE_ENDURANCE',
  ];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService,
    private viewportScroller: ViewportScroller,
    private router: Router,
    private subscriptionService: SubscriptionService
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
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (!email) return;
    console.log('email', email);

    this.authService.isSubscribed(email).subscribe((isSubscribed) => {
      this.isSubscribedUser = isSubscribed;
    });

    this.http
      .get<UserDTO>(`http://localhost:8080/user/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      })
      .subscribe((data) => {
        this.userDetails = data;

        this.subscriptionService
          .getAllSubscriptions()
          .subscribe((subscriptions) => {
            this.allSubscriptions = subscriptions;
            this.subscriptionType = this.getSubscriptionType(
              data.subscription_product_id
            );
            console.log('User Subscription Type:', this.subscriptionType);
          });
      });
  }

  getSubscriptionType(
    productId: string | null
  ): 'entrenamiento' | 'dieta' | 'completo' | null {
    const subscription = this.allSubscriptions.find(
      (sub) => sub.productId === productId
    );
    if (!subscription) return null;

    switch (subscription.name) {
      case 'Entrenamiento':
        return 'entrenamiento';
      case 'Dieta':
        return 'dieta';
      case 'Dieta y Entrenamiento':
        return 'completo';
      default:
        return null;
    }
  }

  navigateToSection(fragment: string) {
    if (this.router.url === '/' || this.router.url.includes('/#')) {
      this.viewportScroller.scrollToAnchor(fragment);
    } else {
      this.router.navigate(['/'], { fragment }).then(() => {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 100);
      });
    }
  }

  openEditModal(): void {
    if (!this.userDetails) return;


    this.editForm.patchValue({
      name: this.userDetails.name || '',
      surname: this.userDetails.surname || '',
      birth_date: this.userDetails.birth_date || '',
      gender: this.userDetails.gender || '',
      meals_per_day: this.userDetails.meals_per_day || '',
      allergies: this.userDetails.allergies || '',
      injuries: this.userDetails.injuries || '',
      gym_goal: this.userDetails.gym_goal || '',
      training_days: this.userDetails.training_days || '',
      weight: this.userDetails.weight || '',
      height: this.userDetails.height || '',
      neck: this.userDetails.neck || '',
      shoulders: this.userDetails.shoulders || '',
      chest: this.userDetails.chest || '',
      waist: this.userDetails.waist || '',
      hips: this.userDetails.hips || '',
      thigh: this.userDetails.thigh || '',
      calf: this.userDetails.calf || '',
    });

    const modalElement = document.getElementById('editUserModal')!;
    this.modalRef = new bootstrap.Modal(modalElement);
    this.modalRef.show();
  }

  submitEdit(): void {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const updatedUser = this.editForm.value;

    this.http
      .patch(`http://localhost:8080/user/${email}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        responseType: 'text' as 'json',
      })
      .subscribe(() => {
        this.modalRef.hide();
        this.ngOnInit();
      });
  }
}
