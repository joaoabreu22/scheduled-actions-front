import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { ScheduledAction } from '../../../../shared/models/scheduled-action.model';
import { ScheduledActionService } from '../../../../core/services/scheduled-action.service';

@Component({
  selector: 'app-action-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './action-list.component.html',
  styleUrl: './action-list.component.scss'
})
export class ActionListComponent implements OnInit, OnDestroy {
  actions: ScheduledAction[] = [];
  paginatedActions: ScheduledAction[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  private subscription!: Subscription;

  constructor(private service: ScheduledActionService) {}

  ngOnInit(): void {
    this.loadActions();

    // Atualiza a lista a cada 10 segundos
    this.subscription = interval(10000).subscribe(() => {
      this.loadActions();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadActions(): void {
    this.service.getAll().subscribe((res) => {
      this.actions = res;
      this.setupPagination();
    });
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.actions.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedActions = this.actions.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setupPagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setupPagination();
    }
  }

  delete(id: string): void {
    this.service.delete(id).subscribe(() => {
      this.actions = this.actions.filter((a) => a.id !== id);
      this.setupPagination();
    });
  }
}
