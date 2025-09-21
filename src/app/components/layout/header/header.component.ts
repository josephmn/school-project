import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  isUserMenuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router // Inyectar Router
  ) {}

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
    this.isUserMenuOpen = false; // Cerrar el menú al hacer logout
  }

  // Método para prevenir el cierre del dropdown al hacer clic en un item
  onDropdownClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}