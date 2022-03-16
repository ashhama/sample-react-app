import FormStoreDataModel from "./FormStoreDataModel";

class FormStoreFormModel {
    id: string;
    values: FormStoreDataModel[];
    
      constructor(id: string, value: FormStoreDataModel) {
        this.id = id;
        this.values = [value];
      }
    }
    
    export default FormStoreFormModel;