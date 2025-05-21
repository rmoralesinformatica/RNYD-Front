import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  serviceCards = [
    {
      title: 'Alimentación',
      description:
        'Describenos tus gustos y preferencias y te ayudaremos a crear tu alimentación ideal.',
      image: 'assets/images/manzana.webp',
    },
    {
      title: 'Entrenamiento',
      description:
        'Dependiendo de tus objetivos y nivel adaptaremos tu plan de entrenamiento personalizado.',
      image: 'assets/images/pesa.webp',
    },
    {
      title: 'Progresos',
      description:
        'Te mantendrás informado de tus progresos desde que comenzaste, motivándote a seguir adelante.',
      image: 'assets/images/vascula.webp',
    }
  ];


  galleryIMages = [
    { name: 'progresos', plan: 'Progreso' },
    { name: 'alimentacion', plan: 'Alimentación' },
    { name: 'entrenamiento', plan: 'Entrenamiento' },
    { name: 'food-training', plan: 'Dieta-Entrenamiento' }
  ];


  gymFeatures = [
    'Recibe rutinas de ejercicio diseñadas específicamente para tus objetivos, nivel de condición física y necesidades.',
    'Un entrenador personal te enseña la forma adecuada de cada ejercicio, reduciendo el riesgo de lesiones.',
    'Mantente motivado y constante gracias al apoyo y los planes estructurados que te brinda un entrenador personal.'
  ];

  plansCards = [
    {
      id: 'plan_basic',
      title: 'Plan Básico',
      description: 'Accede a rutinas semanales y seguimiento básico.',
      amount: 19.99,
      image: 'plan_1'
    },
    {
      id: 'plan_plus',
      title: 'Plan Plus',
      description: 'Incluye dieta personalizada y feedback mensual.',
      amount: 39.99,
      image: 'plan_2'
    },
    {
      id: 'plan_premium',
      title: 'Plan Premium',
      description: 'Entrenamiento y nutrición con soporte total.',
      amount: 59.99,
      image: 'plan_3'
    }
  ];

  subscribe(priceId: string): void {
    console.log('Usuario quiere suscribirse al plan:', priceId);
  }


  trackByIndex(index: number, item: any): number {
    return index;
  }
}
