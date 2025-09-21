import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  loading = false;
  submitted = false;
  message = '';
  error = '';
  currentYear = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.resetForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.message = '';
    this.error = '';

    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.requestPasswordReset(this.f['email'].value)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.message = response.message;
          } else {
            this.error = response.message;
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error de conexión';
          this.loading = false;
        }
      });
  }
}