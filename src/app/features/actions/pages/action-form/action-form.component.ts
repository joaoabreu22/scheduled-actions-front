import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ScheduledActionService } from '../../../../core/services/scheduled-action.service';

@Component({
  selector: 'app-action-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './action-form.component.html',
  styleUrl: './action-form.component.scss'
})
export class ActionFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ScheduledActionService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [''],
      content: [''],
      executionTime: ['']
    });
  }

  submit() {
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(() => {
        alert('Ação agendada com sucesso!');
        this.form.reset();
      });
    }
  }
}

