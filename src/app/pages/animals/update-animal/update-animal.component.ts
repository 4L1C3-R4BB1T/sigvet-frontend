import { Component, OnInit, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import BaseFormComponent from '../../../base/base-form.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../../../services/client.service';
import { User } from '../../../models/user';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-update-animal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    MatAutocompleteModule,
    JsonPipe,
    NgIf
  ],
  templateUrl: './update-animal.component.html',
  styleUrl: './update-animal.component.scss'
})
export class UpdateAnimalComponent extends BaseFormComponent implements OnInit {

  #formBuilder = inject(FormBuilder);

  #clientService = inject(ClientService);

  #activatedRoute = inject(ActivatedRoute);

  clientId = signal<number | null>(this.#activatedRoute.snapshot.params['id'] ?? null);

  clients = signal([] as User[]);

  filteredClients = signal([] as User[]);

  override form = this.#formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    breed: ['', Validators.required],
    birthDate: ['', Validators.required],
    client: this.#formBuilder.group({
      name: ['']
    }),
    clientId: ['', Validators.required],
  });

  async ngOnInit() {
    this.clients.set(await this.#clientService.findAll());
    this.filteredClients.set(this.clients());

    this.form.controls.client.valueChanges.subscribe(() => {
      const typed = this.form.controls.client.controls.name.value!;
      if (typed === '') {
        this.form.controls.clientId.setValue('');
      }
      if (!typed || typed.length < 3) {
        this.filteredClients.set(this.clients());
        return;
      };
      this.filteredClients.set(this.clients().filter(({ name }) => name.toLocaleLowerCase().includes(typed.toLowerCase())))
    });
  }

  onClientSelect(event: MatAutocompleteSelectedEvent) {
    const _document = event.option.value.replace(/(\d{3}\.\d{3}\.\d{3}-\d{2}).*/, '$1');
    const client = this.clients().filter(({ document }) => document.trim() === _document.trim());
    this.form.controls.clientId.setValue(''+client[0].id);
  }
}
