/**
 * Form Element for plain input fields
 *
 */

import React from "react";

import {
  FieldValues,
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";

const InputElement: React.FC<{
  formId?: string;
  inputValues: FormInputModel;
  initialValue?: any;
  registers: UseFormRegisterReturn;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  onChangeFieldValidationHandler?: (
    fieldId: string,
    e?: React.FocusEvent<HTMLButtonElement>
  ) => void;
}> = (props) => {
  
  
  /* When input onChange, handle both the changefieldvalidation handler and hook-form default handler */

  const onChangeHandler = (e: any) => {
    props.onChangeFieldValidationHandler &&
      props.onChangeFieldValidationHandler(props.inputValues.id);
    props.registers.onChange && props.registers.onChange(e);
  };

  /* --------------------------------------- */
  
  return (
    <div className="mb-10">
      <label
        className="font-base text-lg leading-none text-site-gray-800"
        htmlFor={props.inputValues.id}
      >
        {props.inputValues.label}
      </label>
      <input
        defaultValue={props.initialValue ? props.initialValue : ""}
        id={props.inputValues.id}
        type={props.inputValues.type}
        className="flex items-center h-11 px-4 w-full border border-site-grey-300 mt-4 rounded-lg focus:outline-none focus:ring-2"
        placeholder={props.inputValues.placeholder}
        {...props.registers}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default InputElement;
