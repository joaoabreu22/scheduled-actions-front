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
    // Evita vazamento de memória
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadActions(): void {
    this.service.getAll().subscribe((res) => {
      this.actions = res;
    });
  }

  delete(id: string): void {
    this.service.delete(id).subscribe(() => {
      this.actions = this.actions.filter((a) => a.id !== id);
    });
  }
}
