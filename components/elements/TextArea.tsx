/**
 * TextArea Element
 *
 */

import React, { useEffect } from "react";

import {
  FieldValues,
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";

const TextArea: React.FC<{
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
  /* Initialize Values and functions */

  const [text, setText] = React.useState("");

  //3. invoke onChangeFieldValidatiorHandler. This updates the form component with the current field being edited.
  const handleChange = (event: any) => {
    setText(event.target.value);
    props.onChangeFieldValidationHandler &&
      props.onChangeFieldValidationHandler(props.inputValues.id);
  };

  /* --------------------------------------- */

  /* Handle Item Input */

  //initialize values if data provided
  useEffect(() => {
    setText(props.initialValue);
  }, []);

  useEffect(() => {
    props.setValue(props.registers.name, text);
  }, [text]);

  /* --------------------------------------- */

  return (
    <div className="mb-10">
      <label
        className="font-base text-lg leading-none text-site-gray-800"
        htmlFor={props.inputValues.id}
      >
        {props.inputValues.label}
      </label>
      <textarea
        id={props.inputValues.id}
        rows={4}
        className="flex items-center p-4 w-full border border-site-grey-300 mt-3 rounded-lg focus:outline-none focus:ring-2"
        placeholder={props.inputValues.placeholder}
        {...props.registers}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextArea;
