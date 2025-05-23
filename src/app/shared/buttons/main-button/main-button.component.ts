import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.scss',
})
export class MainButtonComponent {
  @Input() url: string = '';
  @Input() label: string = 'Click';
  @Input() className: string = 'type-1';

  isExternal: boolean = false;

  ngOnInit(): void {
    this.isExternal = this.url.startsWith('http');
  }
}
