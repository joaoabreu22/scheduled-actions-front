import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduledActionService } from '../../../../core/services/scheduled-action.service';
import { ScheduledAction } from '../../../../shared/models/scheduled-action.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './action-form.component.html',
  styleUrl: './action-form.component.scss'
})
export class ActionFormComponent implements OnInit {
  form!: FormGroup;
  actionId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ScheduledActionService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [''],
      content: [''],
      executionTime: ['']
    });

    this.actionId = this.route.snapshot.paramMap.get('id');

    if (this.actionId) {
      this.service.getAll().subscribe(actions => {
        const action = actions.find(a => a.id === this.actionId);
        if (action) {
          this.form.patchValue({
            title: action.title,
            content: action.content,
            // converte a execução UTC para local no input
            executionTime: this.toLocalISOString(action.executionTime)
          });
        } else {
          alert('Ação não encontrada');
          this.router.navigate(['/acoes']);
        }
      });
    }
  }

  submit() {
  if (this.form.valid) {
    const formValue = this.form.value;

    // NÃO converter para UTC
    const dto: ScheduledAction = {
      ...formValue,
      executionTime: formValue.executionTime // já vem no formato correto
    };

    const request$ = this.actionId
      ? this.service.update(this.actionId, dto)
      : this.service.create(dto);

    request$.subscribe(() => {
      alert(this.actionId ? 'Ação atualizada com sucesso!' : 'Ação agendada com sucesso!');
      this.router.navigate(['/acoes']);
    });
  }
}


  private toLocalISOString(utcDate: string): string {
    const date = new Date(utcDate);
    // corrige para formato 'yyyy-MM-ddTHH:mm' compatível com input datetime-local
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60 * 1000);
    return local.toISOString().slice(0, 16);
  }
}
