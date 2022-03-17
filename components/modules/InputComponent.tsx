import React, { useEffect } from "react";
import { formActions } from "../../store/form";
import { useDispatch, useSelector } from "react-redux";
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormRegisterReturn,
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
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  formData?: any;
}> = (props) => {

  
  useEffect(() => {
    //initially register values
  }, [])

  const dispatch = useDispatch();



  function selectOnChangeHandler(value:any) {
    
    //validate if required (error dispatch in main handler is having issues. Will get back to this later)
    const isValid = props.inputValues.required? (value ? true : false) : true;
    
    dispatch(formActions.addToStore({
      formId: props.formId,
      values: { id: props.inputValues.id, value: value, isValid: isValid }
    }));

  }

  function onBlurHandler(e: any) {
    
    const value = props.getValues()[props.inputValues.id];
    
    //validate if required (error dispatch in main handler is having issues. Will get back to this later)
    const isValid = props.inputValues.required? (value ? true : false) : true;

    dispatch(formActions.addToStore({
      formId: props.formId,
      values: { id: props.inputValues.id, value: value, isValid: isValid }
    }));
  }


  return (
    <FormColumn span={props.inputValues.span}>
      {props.inputValues.type === "select" ? (
        <SelectElement
          formId={props.formId}
          inputValues={props.inputValues}
          getValues={props.getValues}
          onChange={selectOnChangeHandler}
          setValue={props.setValue}
          initialValue={props.formData}
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
          onChange={selectOnChangeHandler}
          setValue={props.setValue}
          initialValue={props.formData}
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
          setValue={props.setValue}
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            pattern: /^\S+@\S+$/i,
            value: props.formData,
          })}
        />
      )  : props.inputValues.type === "textarea" ? (
        <TextArea
          formId={props.formId}
          inputValues={props.inputValues}
          getValues={props.getValues}
          setValue={props.setValue}
          initialValue={props.formData}
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
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            value: props.formData,
          })}
        />
      ): props.inputValues.type === "checkbox" ? (
        <CheckboxGroupElement
          formId={props.formId}
          inputValues={props.inputValues}
          getValues={props.getValues}
          setValue={props.setValue}
          initialValue={props.formData}
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            value: props.formData,
          })}
        />
      ): props.inputValues.type === "declaration" ? (
        <TermsConditionsElement
          formId={props.formId}
          inputValues={props.inputValues}
          getValues={props.getValues}
          setValue={props.setValue}
          registers={props.register(props.inputValues.id, {
            required: props.inputValues.required,
            value: props.formData,
          })}
        />
      ): (
        <InputElement
          formId={props.formId}
          inputValues={props.inputValues}
          getValues={props.getValues}
          setValue={props.setValue}
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
