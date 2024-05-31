import { Component, ViewChild, inject, signal } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { FilterComponent } from '../../components/filter/filter.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { ShowAppliedFiltersComponent } from '../../components/show-applied-filters/show-applied-filters.component';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user-service.service';
import { UserAccessTableComponent } from './user-access-table/user-access-table.component';

@Component({
  selector: 'app-user-access',
  standalone: true,
  imports: [
    PaginatorComponent,
    FilterComponent,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
    DialogModule,
    MatTabsModule,
    RouterLink,
    RouterOutlet,
    ShowAppliedFiltersComponent,
    UserAccessTableComponent
  ],
  templateUrl: './user-access.component.html',
  styleUrl: './user-access.component.scss'
})
export default class UserAccessComponent {

  @ViewChild(UserAccessTableComponent)
  userAccessTable!: UserAccessTableComponent;

  #toastrService = inject(ToastrService);

  openPermitAllDialog = signal(false);
  openRemoveAllDialog = signal(false);

  #userService = inject(UserService);
  #accountService = inject(AccountService);

  openMoreFilterModal = signal(false);
  data = signal([] as User[]);


  ngAfterViewInit() {
    this.reload();
  }

  async searchByTerm(term: string) {
    this.data.set(await this.#userService.searchByTermAndViewerRole(term));
  }

  async reload() {
    const data = await this.#userService.findByViewerRole();
    this.data.set(data);
  }

  async clear(input: HTMLInputElement) {
    input.value = '';
    await this.reload();
  }

  close() {
    this.openPermitAllDialog.set(false);
    this.openRemoveAllDialog.set(false);
  }

  async removeAll() {
    if (!this.isSelected()) {
      this.#toastrService.info('Selecione usuários');
      return;
    }
    for (const { id } of this.userAccessTable.selection.selected) {
      await this.#userService.deleteById(id);
    }

    this.userAccessTable.selection.deselect();
    this.close();
    await this.reload();
  }

  async permitAll() {
    if (!this.isSelected()) {
      this.#toastrService.info('Selecione usuários');
      return;
    }
    for (const { id } of this.userAccessTable.selection.selected) {
      await this.#accountService.allowAccess(id);
    }
    this.userAccessTable.selection.deselect();
    this.close();
    await this.reload();
  }

  isSelected() {
    return this.userAccessTable.selection.selected.length > 0;
  }

  // async reload(params?: PageModel<User[]>) {
  //   const pageModel = await this.#userService.findAll(params)
  //   this.paginator.length = pageModel.totalElements;
  //   this.data.set(pageModel.elements);
  // }


}
