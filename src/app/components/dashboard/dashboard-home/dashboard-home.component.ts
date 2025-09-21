import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {
  stats = [
    { title: 'Total Estudiantes', value: '1,254', icon: 'fas fa-user-graduate', color: 'primary' },
    { title: 'Total Profesores', value: '48', icon: 'fas fa-chalkboard-teacher', color: 'success' },
    { title: 'Cursos Activos', value: '32', icon: 'fas fa-book', color: 'info' },
    { title: 'Eventos Próximos', value: '5', icon: 'fas fa-calendar-alt', color: 'warning' }
  ];

  recentActivities = [
    { activity: 'Nuevo estudiante registrado', time: 'Hace 10 minutos' },
    { activity: 'Calificaciones actualizadas', time: 'Hace 30 minutos' },
    { activity: 'Reunión de padres programada', time: 'Hace 1 hora' },
    { activity: 'Nuevo curso creado', time: 'Hace 2 horas' },
    { activity: 'Asistencia tomada', time: 'Hace 3 horas' }
  ];
}