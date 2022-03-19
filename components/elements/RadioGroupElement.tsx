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
  const [radio, setRadio] = React.useState("");

  

  const handleChange = (event: any) => {
    setRadio(event.target.value);
  };

  const resetRadioState = () => {
    setRadio("");
  };

  //initialize values if data provided
  useEffect(() => {
    setRadio(props.initialValue);
  }, []);

  useEffect(() => {
    props.setValue(props.registers.name, radio);
    props.onChange && props.onChange(radio);
    
    //invoke onChangeFieldValidatiorHandle
    props.onChangeFieldValidationHandler && props.onChangeFieldValidationHandler(props.inputValues.id);
    
    
  }, [radio]);

  //watch for changes and clear if reset
  const fieldWatchValue = useWatch({
    control: props.control,
    name: props.inputValues.id,
  });

  useEffect(() => {
    
    if(!fieldWatchValue){
      resetRadioState();
    }
     
  },[fieldWatchValue]) 

  const items: string[] = [
    ...(props.inputValues.selectOptions ? props.inputValues.selectOptions : []),
  ];

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
            <div key={item}>
              <input
                type={props.inputValues.type}
                value={item}
                checked={radio === item}
                onChange={handleChange}
              />{" "}
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadioGroupElement;
