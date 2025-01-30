import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnDestroy{

	private router = inject(Router);
	private logoutSubscription: Subscription | null = null;

  	loginService = inject(LoginService);

	logout() {
 		this.logoutSubscription = this.loginService.logout().subscribe({
 			next: _ => { this.navigateToLogin(); },
 			error: _ => { this.navigateToLogin(); }
 		})
 	}

 	navigateToLogin() {
 		this.router.navigate(['login']);
 	}

 	navigateHome() {
 		this.router.navigate(['home']);
 	}

	ngOnDestroy(): void {
		this.logoutSubscription?.unsubscribe();
	}
}
