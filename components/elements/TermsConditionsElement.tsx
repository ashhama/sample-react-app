/**
 * Terms and Conditions checkbox Element
 *
 */

import { useEffect, useState } from "react";
import {
  Control,
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormSetError,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";
import LinksContainer from "../layouts/LinksContainer";

const TermsConditionsElement: React.FC<{
  formId?: string;
  inputValues: FormInputModel;
  registers: UseFormRegisterReturn;
  control?: Control<FieldValues, any>;
  initialValue?: any;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  onChangeFieldValidationHandler?: (
    fieldId: string,
    e?: React.FocusEvent<HTMLButtonElement>
  ) => void;
}> = (props) => {
  /* Initialize Values and functions */

  const [checked, setChecked] = useState(
    props.initialValue ? (props.initialValue as boolean) : false
  );

  const handleChange = (event: any) => {
    setChecked((currentValue) => !currentValue);
  };

  //passes object onblur function to hook-form on blur function
  const onBlurHandler = (e: any) => {
    props.registers.onBlur && props.registers.onBlur(e);
  };

  /* --------------------------------------- */

  /* Handle Item Selection */
  useEffect(() => {
    //1. update the form state when value is selected, and invoke any handlers
    props.setValue(props.registers.name, checked);

    //2. Handle Errors
    if (!checked) {
      props.setError(props.registers.name, {
        type: "manual",
        message: "Selection Empty",
      });
    } else {
      props.clearErrors(props.registers.name);
    }

    //3. invoke onChangeFieldValidatiorHandler. This updates the form component with the current field being edited.
    props.onChangeFieldValidationHandler &&
      props.onChangeFieldValidationHandler(props.inputValues.id);
  }, [checked]);

  /* --------------------------------------- */

  /* Watch for Changes in the field and reset value in the event that the form is reset */
  const fieldWatchValue = useWatch({
    control: props.control,
    name: props.inputValues.id,
  });

  useEffect(() => {
    if (!fieldWatchValue) {
      setChecked(props.initialValue ? (props.initialValue as boolean) : false);
    }
  }, [fieldWatchValue]);

  /* --------------------------------------- */

  return (
    <LinksContainer>
      <h3 className="mb-6 text-2xl leading-none font-base text-black">
        {props.inputValues.label}
      </h3>
      {props.inputValues.sublabel && (
        <p className="mb-6 font-base text-lg leading-none text-site-gray-800">
          {props.inputValues.sublabel}
        </p>
      )}
      <div>
        <input
          id={props.inputValues.id}
          type="checkbox"
          {...props.registers}
          onBlur={onBlurHandler}
          checked={checked}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="ml-2 text-gray-700 text-black font-medium">
          {props.inputValues.placeholder}
        </span>
      </div>
    </LinksContainer>
  );
};
export default TermsConditionsElement;
