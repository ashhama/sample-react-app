class FormStoreDataModel {
    id: string;
    value: string;
    isValid: boolean;
    
      constructor(id: string, value: string, isValid: boolean) {
        this.id = id;
        this.value = value;
        this.isValid = isValid;
      }
    }
    
    export default FormStoreDataModel;