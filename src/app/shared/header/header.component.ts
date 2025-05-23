import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {
  faSignOutAlt,
  faSignInAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faUserCircle = faUserCircle;
  isAdmin: boolean = false;
  constructor(private authService: AuthService, private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const email = this.authService.getAdminEmail();
      if (email) {
        this.authService.checkIfAdmin(email).subscribe((isAdmin) => {
          this.isAdmin = isAdmin;
        });
      }
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleMenu(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const menuFixed = document.querySelector('.menu-fixed');
    if (menuFixed) {
      if (checkbox.checked) {
        menuFixed.classList.add('active');
      } else {
        menuFixed.classList.remove('active');
      }
    }
  }

  closeMenu(): void {
    const menuFixed = document.querySelector('.menu-fixed');
    if (menuFixed) {
      menuFixed.classList.remove('active'); 
    }
    const checkbox = document.getElementById('check') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
