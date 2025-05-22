import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gymGoalLabel'
})
export class GymGoalLabelPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'GAIN_MUSCLE':
        return 'Ganar masa muscular';
      case 'LOSE_WEIGHT':
        return 'Perder peso';
      case 'MAINTAIN_FITNESS':
        return 'Mantener forma física';
      case 'IMPROVE_ENDURANCE':
        return 'Mejorar resistencia';
      default:
        return 'Sin objetivo definido';
    }
  }
}
