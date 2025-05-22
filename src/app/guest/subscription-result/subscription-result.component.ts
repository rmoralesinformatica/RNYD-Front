import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../../core/services/subscription.service';

@Component({
  selector: 'app-subscription-result',
  templateUrl: './subscription-result.component.html',
  styleUrl:'./subscription-result.component.scss'
})
export class SubscriptionResultComponent implements OnInit {
  success = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const isFailRoute =
      this.route.snapshot.routeConfig?.path === 'subscription-result/fail';

    if (isFailRoute) {
      this.error = true;
      return;
    }

    const email = localStorage.getItem('email') as string;
    const productId = this.route.snapshot.paramMap.get('productId') as string;

    console.log('email', email);
    console.log('productId', productId);

    // if (!email || !productId) {
    //   this.router.navigate(['/']);
    //   return;
    // }

    this.subscriptionService.assignSubscription(email, productId).subscribe({
      next: () => (this.success = true),
      error: () => (this.error = true),
    });
  }
}
