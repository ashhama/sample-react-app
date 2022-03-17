import { useState } from "react";
import { FieldValues, UseFormGetValues, UseFormRegister, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";
import LinksContainer from "../layouts/LinksContainer";

const TermsConditionsElement: React.FC<{
    formId?: string;
    inputValues: FormInputModel;
    registers: UseFormRegisterReturn;
    getValues: UseFormGetValues<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
  }> = (props) => {

    const [checked, setChecked] = useState(false);

    const handleChange = (event: any) => {
        setChecked(currentValue => !currentValue);
    };

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
                checked={checked}
                onChange={ handleChange} className="form-checkbox h-5 w-5 text-blue-600" /><span className="ml-2 text-gray-700 text-black font-medium">{props.inputValues.placeholder}</span>
            
        </div>
      </LinksContainer>
    )
};
export default TermsConditionsElement;