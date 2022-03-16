import FormInputModel from "./FormInputModel";

class FormSectionModel {
    title:string;
    formInputs: FormInputModel[];
      
    
      constructor(title: string, formInputs: FormInputModel[]) {
        this.title = title;
        this.formInputs = formInputs;
      }
    }
    
    export default FormSectionModel;