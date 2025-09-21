import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Router } from '@angular/router'; // Importar Router
import { User, LoginResponse, ResetPasswordResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private router: Router) { // Inyectar Router
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return of(this.mockLogin(email, password)).pipe(
      delay(1000),
      map(response => {
        if (response.success && response.user && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redirigir a login
  }

  requestPasswordReset(email: string): Observable<ResetPasswordResponse> {
    return of(this.mockPasswordReset(email)).pipe(delay(1000));
  }

  private mockLogin(email: string, password: string): LoginResponse {
    const users: User[] = [
      { id: 1, email: 'admin@school.com', password: 'admin123', name: 'Administrador', role: 'admin' },
      { id: 2, email: 'teacher@school.com', password: 'teacher123', name: 'Profesor Ejemplo', role: 'teacher' },
      { id: 3, email: 'student@school.com', password: 'student123', name: 'Estudiante Ejemplo', role: 'student' }
    ];

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        token: 'mock-jwt-token-' + user.id,
        user: userWithoutPassword
      };
    } else {
      return {
        success: false,
        message: 'Email o contraseña incorrectos'
      };
    }
  }

  private mockPasswordReset(email: string): ResetPasswordResponse {
    const validEmails = ['admin@school.com', 'teacher@school.com', 'student@school.com'];
    
    if (validEmails.includes(email)) {
      return {
        success: true,
        message: 'Se ha enviado un enlace de recuperación a su correo electrónico'
      };
    } else {
      return {
        success: false,
        message: 'El email proporcionado no existe en nuestro sistema'
      };
    }
  }
}