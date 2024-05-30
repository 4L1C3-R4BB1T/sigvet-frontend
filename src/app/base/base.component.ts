import { inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store";
import { FilterPropertyModel } from "../components/filter/filter.model";

export default class BaseComponent {

  protected store: Store<AppState> = inject(Store);

  protected filterPropertyModel: FilterPropertyModel[] = [];

  protected appliedFilters = signal([] as FilterPropertyModel[]);

  protected getInput(): HTMLInputElement {
    throw new Error('Needs implementantion');
  }

  protected getEntityService(): any {
    throw new Error('Needs implementantion');
  }

  protected reload(): void {
    throw new Error('Needs implementantion');
  }

  protected setData(data: any) {
    throw new Error('Needs implementantion');
  }

  clearAppliedFilters() {
    this.appliedFilters.set([]);
  }

  clearFilters() {
    this.getInput().value = '';
    this.reload();
  }

  protected searchByName(name: string) {
    throw new Error('Needs implementantion');
  }


  async handleOnFilter(properties: FilterPropertyModel[]) {
    const equalFilters = properties.reduce((currentQueryParam, propertyFilter) => {
      if (currentQueryParam.length !== 0) {
        currentQueryParam += ';';
      }
      return currentQueryParam + `${propertyFilter.property}:=${propertyFilter.outputValue}`;
    }, '');

    this.appliedFilters.set(properties);

    const data = await this.getEntityService().findAll({
      equal_filters: equalFilters,
    })

    this.setData(data);
  }


}
