/**
 * This is the core form input handler. All form fields are generated through this handler.
 *
 */

import React, { useEffect } from "react";
import { formActions } from "../../store/form";
import { useDispatch, useSelector } from "react-redux";
import {
  Control,
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";
import InputElement from "../elements/InputElement";
import RadioGroupElement from "../elements/RadioGroupElement";
import MultiSelectElement from "../elements/MultiSelectElement";
import SelectElement from "../elements/SelectElement";
import FormColumn from "../layouts/FormColumn";
import CheckboxGroupElement from "../elements/CheckboxGroupElement";
import TermsConditionsElement from "../elements/TermsConditionsElement";
import TextArea from "../elements/TextArea";

const InputComponent: React.FC<{
  formId: string;
  inputValues: FormInputModel;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  onChangeFieldValidationHandler?: (
    fieldId: string,
    e?: React.FocusEvent<HTMLButtonElement>
  ) => void;
  formData?: any;
  control: Control<FieldValues, any>;
}> = (props) => {

// Pass the correct prop to the corresponsing input component. More re-factoring can be done here to make this cleaner and more structured. Will have a look at how inheritance can be used here

  return (
    <FormColumn span={props.inputValues.span}>
      {props.inputValues.type === "select" ? (
        <SelectElement
          formId={props.formId}
          inputValues={props.inputValues}
          setError={props.setError}
          clearErrors={props.clearErrors}
          getValues={props.getValues}
          setValue={props.setValue}
          initialValue={props.formData}
          onChangeFieldValidationHandler={props.onChangeFieldValidationHandler}
          control={props.control}
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            value: props.formData,
          })}
        />
      ) : props.inputValues.type === "multi-select" ? (
        <MultiSelectElement
          formId={props.formId}
          inputValues={props.inputValues}
          getValues={props.getValues}
          setError={props.setError}
          clearErrors={props.clearErrors}
          control={props.control}
          setValue={props.setValue}
          initialValue={props.formData}
          onChangeFieldValidationHandler={props.onChangeFieldValidationHandler}
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            value: props.formData,
          })}
        />
      ) : props.inputValues.type === "email" ? (
        <InputElement
          formId={props.formId}
          inputValues={props.inputValues}
          getValues={props.getValues}
          initialValue={props.formData}
          setValue={props.setValue}
          onChangeFieldValidationHandler={props.onChangeFieldValidationHandler}
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            pattern: /^\S+@\S+$/i,
            value: props.formData,
          })}
        />
      ) : props.inputValues.type === "textarea" ? (
        <TextArea
          formId={props.formId}
          inputValues={props.inputValues}
          getValues={props.getValues}
          setValue={props.setValue}
          initialValue={props.formData}
          onChangeFieldValidationHandler={props.onChangeFieldValidationHandler}
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            value: props.formData,
          })}
        />
      ) : props.inputValues.type === "radio" ? (
        <RadioGroupElement
          formId={props.formId}
          inputValues={props.inputValues}
          getValues={props.getValues}
          setValue={props.setValue}
          initialValue={props.formData}
          control={props.control}
          onChangeFieldValidationHandler={props.onChangeFieldValidationHandler}
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            value: props.formData,
          })}
        />
      ) : props.inputValues.type === "checkbox" ? (
        <CheckboxGroupElement
          formId={props.formId}
          inputValues={props.inputValues}
          setError={props.setError}
          clearErrors={props.clearErrors}
          getValues={props.getValues}
          setValue={props.setValue}
          control={props.control}
          initialValue={props.formData}
          onChangeFieldValidationHandler={props.onChangeFieldValidationHandler}
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            value: props.formData,
          })}
        />
      ) : props.inputValues.type === "declaration" ? (
        <TermsConditionsElement
          formId={props.formId}
          inputValues={props.inputValues}
          setError={props.setError}
          clearErrors={props.clearErrors}
          getValues={props.getValues}
          setValue={props.setValue}
          initialValue={props.formData}
          control={props.control}
          onChangeFieldValidationHandler={props.onChangeFieldValidationHandler}
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            value: props.formData,
          })}
        />
      ) : (
        <InputElement
          formId={props.formId}
          inputValues={props.inputValues}
          getValues={props.getValues}
          initialValue={props.formData}
          setValue={props.setValue}
          onChangeFieldValidationHandler={props.onChangeFieldValidationHandler}
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            value: props.formData,
          })}
        />
      )}
    </FormColumn>
  );
};

export default InputComponent;
