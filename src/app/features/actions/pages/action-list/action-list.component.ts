import { Component, OnInit } from '@angular/core';
import { ScheduledActionService } from '../../../../core/services/scheduled-action.service';
import { ScheduledAction } from '../../../../shared/models/scheduled-action.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-list.component.html',
  styleUrl: './action-list.component.scss'
})
export class ActionListComponent implements OnInit {
  actions: ScheduledAction[] = [];

  constructor(private service: ScheduledActionService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(res => this.actions = res);
  }

  delete(id: string): void {
    this.service.delete(id).subscribe(() => {
      this.actions = this.actions.filter(a => a.id !== id);
    });
  }
}
