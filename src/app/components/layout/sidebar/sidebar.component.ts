import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems = [
    { path: '/dashboard', icon: 'fas fa-home', title: 'Inicio' },
    { path: '/courses', icon: 'fas fa-book', title: 'Cursos' },
    { path: '/students', icon: 'fas fa-user-graduate', title: 'Estudiantes' },
    { path: '/teachers', icon: 'fas fa-chalkboard-teacher', title: 'Profesores' },
    { path: '/schedule', icon: 'fas fa-calendar-alt', title: 'Horarios' },
    { path: '/grades', icon: 'fas fa-chart-bar', title: 'Calificaciones' },
    { path: '/attendance', icon: 'fas fa-clipboard-check', title: 'Asistencias' },
    { path: '/reports', icon: 'fas fa-file-alt', title: 'Reportes' },
    { path: '/settings', icon: 'fas fa-cog', title: 'Configuración' }
  ];

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}