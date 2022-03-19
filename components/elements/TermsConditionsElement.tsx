import { useEffect, useState } from "react";
import { FieldValues, UseFormClearErrors, UseFormGetValues, UseFormRegister, UseFormRegisterReturn, UseFormSetError, UseFormSetValue } from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";
import LinksContainer from "../layouts/LinksContainer";

const TermsConditionsElement: React.FC<{
    formId?: string;
    inputValues: FormInputModel;
    registers: UseFormRegisterReturn;
    setError: UseFormSetError<FieldValues>;
    clearErrors: UseFormClearErrors<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    onChangeFieldValidationHandler?: (fieldId: string, e?: React.FocusEvent<HTMLButtonElement>) => void
  }> = (props) => {

    const [checked, setChecked] = useState(false);

    const handleChange = (event: any) => {
        setChecked(currentValue => !currentValue);
    };

    const onBlurHandler = (e: any) => {
      props.registers.onBlur && props.registers.onBlur(e);
    };

    useEffect(() => {
      
      props.setValue(props.registers.name, checked);
  
      if (!checked) {
        props.setError(props.registers.name, {
          type: "manual",
          message: "Selection Empty",
        });  
      }else{
        props.clearErrors(props.registers.name);
      }
  
      // invoke onChangeFieldValidatiorHandle
      props.onChangeFieldValidationHandler && props.onChangeFieldValidationHandler(props.inputValues.id);
      
    }, [checked]);

    return (
        <LinksContainer>
        <h3 className="mb-6 text-2xl leading-none font-base text-black">
          {props.inputValues.label}
        </h3>
        {props.inputValues.sublabel && 
        <p className="mb-6 font-base text-lg leading-none text-site-gray-800">{props.inputValues.sublabel}</p>
        }
        <div>
        <input  id={props.inputValues.id}
                type='checkbox'
                {...props.registers}
                onBlur={onBlurHandler}
                checked={checked}
                onChange={ handleChange} className="form-checkbox h-5 w-5 text-blue-600" /><span className="ml-2 text-gray-700 text-black font-medium">{props.inputValues.placeholder}</span>
            
        </div>
      </LinksContainer>
    )
};
export default TermsConditionsElement;