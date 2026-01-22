import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { 
  selectCurrentUser, 
  selectActiveTasks, 
  selectCompletedTasks 
} from '../../store/task.selectors';
import { 
  logout, 
  addTask, 
  updateTask, 
  deleteTask, 
  toggleTask 
} from '../../store/task.actions';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit{
   currentUser$: Observable<string | null>;
  activeTasks$: Observable<Task[]>;
  completedTasks$: Observable<Task[]>;
  
  taskForm: FormGroup;
  editingTask: Task | null = null;
  showForm = false;

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.activeTasks$ = this.store.select(selectActiveTasks);
    this.completedTasks$ = this.store.select(selectCompletedTasks);
    
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      priority: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  onLogout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.editingTask = null;
      this.taskForm.reset({ priority: 3 });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    this.currentUser$.subscribe(user => {
      if (!user) return;

      const formValue = this.taskForm.value;
      
      if (this.editingTask) {
        // Update existing task
        const updatedTask: Task = {
          ...this.editingTask,
          ...formValue
        };
        this.store.dispatch(updateTask({ task: updatedTask }));
      } else {
        // Add new task
        const newTask: Task = {
          id: Date.now(),
          userId: user,
          completed: false,
          ...formValue
        };
        this.store.dispatch(addTask({ task: newTask }));
      }

      this.taskForm.reset({ priority: 3 });
      this.editingTask = null;
      this.showForm = false;
    }).unsubscribe();
  }

  onEdit(task: Task): void {
    this.editingTask = task;
    this.showForm = true;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
    });
  }

  onToggle(id: number): void {
    this.store.dispatch(toggleTask({ id }));
  }

  onDelete(id: number): void {
    if (confirm('Supprimer cette tâche ?')) {
      this.store.dispatch(deleteTask({ id }));
    }
  }

  getPriorityClass(priority: number): string {
    if (priority >= 4) return 'high';
    if (priority >= 3) return 'medium';
    return 'low';
  }

  getPriorityLabel(priority: number): string {
    const labels = ['', 'Très basse', 'Basse', 'Moyenne', 'Haute', 'Urgente'];
    return labels[priority] || '';
  }

}
