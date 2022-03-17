class FormInputModel {
  id: string;
  label: string;
  sublabel?: string;
  type: string;
  placeholder: string;
  span: number;
  required?: boolean;
  selectOptions?: string[];
  
    
  
    constructor(id: string, label: string, placeholder: string, type: string, span:number, required?:boolean, selectOptions?: string[],sublabel?: string) {
      this.id = id;
      this.label = label;
      this.type = type;
      this.placeholder = placeholder;
      this.span = span;
      this.required = required;
      this.selectOptions = selectOptions;
      this.sublabel = sublabel;

    }
  }
  
  export default FormInputModel;