export interface FilterPropertyModel {
  property: string;
  propertyNickname: string;
  mask?: string;
  outputValue?: string;
  type?: 'date' | null;
  pattern?: string | RegExp;
}
