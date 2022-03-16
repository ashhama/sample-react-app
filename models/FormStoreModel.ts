import FormStoreFormModel from "./FormStoreFormModel";

class FormStoreModel {
  forms: { fields:{id: string; value: string; isValid: boolean}[] }[];
  
  constructor() {
    this.forms = [];
  }
}

export default FormStoreModel;
