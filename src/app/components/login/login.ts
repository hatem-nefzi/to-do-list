import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/task.actions';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';

  constructor(
    private store: Store,
    private router: Router
  ) {}

  onLogin(): void {
    if (this.email.trim()) {
      this.store.dispatch(login({ email: this.email }));
      this.router.navigate(['/tasks']);
    }
  }
}