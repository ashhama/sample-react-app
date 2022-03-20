/**
 * Radio Group Element
 *
 */

import React, { useEffect } from "react";
import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";

const RadioGroupElement: React.FC<{
  formId?: string;
  inputValues: FormInputModel;
  registers: UseFormRegisterReturn;
  initialValue?:any;
  control?: Control<FieldValues, any>
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: any) => void;
  onChangeFieldValidationHandler?: (fieldId: string, e?: React.FocusEvent<HTMLButtonElement>) => void
}> = (props) => {

  /* Initialize Values */

  const [radio, setRadio] = React.useState(props.initialValue? props.initialValue : "");
  const items: string[] = [
    ...(props.inputValues.selectOptions ? props.inputValues.selectOptions : []),
  ];

  /* --------------------------------------- */

  /* Initialize Function Handlers*/

  const handleChange = (event: any) => {
    setRadio(event.target.value);
  };

  const resetRadioState = () => {
    setRadio(props.initialValue? props.initialValue : "");
  };

  /* --------------------------------------- */

  //set default/initially provided values on first load
  useEffect(() => {
    setRadio(props.initialValue);
  }, []);

  /* Handle Item Selection */
  useEffect(() => {
    //1. update the form state when value is seleected and invoke any handlers
    props.setValue(props.registers.name, radio);
    props.onChange && props.onChange(radio);
    
    //3. invoke onChangeFieldValidatiorHandler. This updates the form component with the current field being edited.
    props.onChangeFieldValidationHandler && props.onChangeFieldValidationHandler(props.inputValues.id);
    
    
  }, [radio]);

  /* Watch for Changes in the field and reset value in the event that the form is reset */
  const fieldWatchValue = useWatch({
    control: props.control,
    name: props.inputValues.id,
  });

  useEffect(() => {
    
    if(!fieldWatchValue){
      resetRadioState();
    }
     
  },[fieldWatchValue]) 



  return (
    <div className="mb-10 flex">
      <div className="flex flex-col">
        <label
          className="font-base text-lg leading-none text-site-gray-800"
          htmlFor={props.inputValues.id}
        >
          {props.inputValues.label}
        </label>
        <div className="flex flex-row gap-10 mt-10">
          {items.map((item) => (
            <div className="flex" key={item}>
              <span className="ml-2 mr-4 mb-1 text-lg">{item}</span>
              <input
                type={props.inputValues.type}
                value={item}
                className="h-5 w-5 accent-gray-500 mt-1"
                checked={radio === item}
                onChange={handleChange}
              />{" "}
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadioGroupElement;
