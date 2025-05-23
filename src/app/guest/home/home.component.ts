import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../../core/services/subscription.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  contactForm!: FormGroup;
  plansCards: any[] = [];

  serviceCards = [
    {
      title: 'Alimentación',
      description:
        'Describenos tus gustos y preferencias y te ayudaremos a crear tu alimentación ideal .',
      image: 'assets/images/manzana.webp',
    },
    {
      title: 'Entrenamiento',
      description:
        'Dependiendo de tus objetivos y nivel adaptaremos tu plan de entrenamiento personalizado..',
      image: 'assets/images/pesa.webp',
    },
    {
      title: 'Progresos',
      description:
        'Te mantendras informado de tus progresos desde que comenzaste motivandote a seguir adelante.',
      image: 'assets/images/vascula.webp',
    },
  ];

  galleryIMages = [
    { name: 'progresos', plan: 'Progreso' },
    { name: 'alimentacion', plan: 'Alimentacion' },
    { name: 'entrenamiento', plan: 'Entrenamiento' },
    { name: 'food-training', plan: 'Dieta-Entrenamiento' },
  ];
  secondaryGalleryIMages = [
    'gallery_1',
    'gallery_2',
    'gallery_3',
    'gallery_4',
    'gallery_5',
    'gallery_6',
  ];

  gymFeatures = [
    'Recibe rutinas de ejercicio diseñadas específicamente para tus objetivos, nivel de condición física y necesidades, asegurando resultados más rápidos y seguros.. ',
    'Un entrenador personal te enseña la forma adecuada de cada ejercicio, reduciendo el riesgo de lesiones y maximizando la efectividad de tus entrenamientos. ',
    'Mantente motivado y constante gracias al apoyo, la guía y los planes estructurados que te brinda un entrenador personal.',
  ];

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPlans();
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: [''],
      terms: [false, Validators.requiredTrue],
    });
  }

  loadPlans(): void {
    this.subscriptionService.getAllSubscriptions().subscribe((subs) => {
      console.log('subs', subs);
      this.plansCards = subs.map((sub, index) => ({
        id: sub.productId,
        title: sub.name,
        description: sub.description,
        amount: sub.amount / 100,
        image: `plan_${index + 1}`,
      }));
    });
  }

  subscribe(pirceId: string): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const stripeDTO = {
      priceId: pirceId, 
      successUrl: `${window.location.origin}/subscription-result/${pirceId}`,
      cancelUrl: `${window.location.origin}/subscription-result/fail`,
    };

    this.subscriptionService.createCheckoutSession(stripeDTO).subscribe({
      next: (res: any) => {
        if (res && res.url) {
          window.location.href = res.url;
        }
      },
      error: (err: any) => {
        console.error('Error creating checkout session:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Name:', this.contactForm.value.name);
      console.log('Email:', this.contactForm.value.email);
      console.log('Message:', this.contactForm.value.message);
      console.log('Terms accepted:', this.contactForm.value.terms);
    } else {
      console.log('Form not valid');
    }
  }
}
