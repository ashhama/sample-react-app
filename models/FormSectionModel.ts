import FormInputModel from "./FormInputModel";

class FormSectionModel {
    title:string;
    slug:string;
    formInputs: FormInputModel[];
    allFieldsValid: boolean;
      
    
      constructor(title: string, formInputs: FormInputModel[]) {
        this.title = title;
        this.formInputs = formInputs;
        this.slug = title.toLowerCase().replace(/ /g, '-');
        this.allFieldsValid = false;
      }
    }
    
    export default FormSectionModel;