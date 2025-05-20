import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone:false,
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

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
