import FormSectionModel from "./FormSectionModel";

class ServiceFormModel {
    id: string;
    slug:string;
    title:string;
    formSections: FormSectionModel[];
      
    
      constructor(id: string, title:string, slug:string, formSections: FormSectionModel[]) {
        this.id = id;
        this.slug = slug;
        this.title = title;
        this.formSections = formSections;
  
      }
    }
    
    export default ServiceFormModel;