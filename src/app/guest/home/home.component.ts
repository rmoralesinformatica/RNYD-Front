import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // ❗ Era "styleUrl", debe ser styleUrls
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
}
