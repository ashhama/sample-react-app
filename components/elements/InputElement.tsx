import React from "react";

import { FieldValues, UseFormGetValues, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";

const InputElement: React.FC<{
  formId?: string;
  inputValues: FormInputModel;
  registers: UseFormRegisterReturn;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}> = (props) => {

  

  return (
    <div className="mb-10">
      <label
        className="font-base text-lg leading-none text-site-gray-800"
        htmlFor={props.inputValues.id}
      >
        {props.inputValues.label}
      </label>
      <input
        
        id={props.inputValues.id}
        type={props.inputValues.type}
        className="flex items-center h-11 px-4 w-full border border-site-grey-300 mt-3 rounded-lg focus:outline-none focus:ring-2"
        placeholder={props.inputValues.placeholder}
        {...props.registers}
      />
    </div>
  );
};

export default InputElement;
