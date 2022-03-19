import React, { useEffect, useState } from "react";
import {
  Control,
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetError,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";

const CheckboxGroupElement: React.FC<{
  formId?: string;
  inputValues: FormInputModel;
  registers: UseFormRegisterReturn;
  initialValue?:any;
  control?: Control<FieldValues, any>
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: any) => void;
  onChangeFieldValidationHandler?: (fieldId: string, e?: React.FocusEvent<HTMLButtonElement>) => void
}> = (props) => {
  const items: string[] = [
    ...(props.inputValues.selectOptions ? props.inputValues.selectOptions : []),
  ];
 
  const [selectedItems, setSelectedItems] = useState<string[]>(props.initialValue? props.initialValue : []);

  function isSelected(value: any) {
    return selectedItems.find((el) => el === value) ? true : false;
  }

  const onBlurHandler = (e: any) => {
    props.registers.onBlur && props.registers.onBlur(e);
  };


  useEffect(() => {
    props.setValue(props.registers.name, selectedItems);
    props.onChange && props.onChange(selectedItems);

    //handle errors
    if (!selectedItems) {
      props.setError(props.registers.name, {
        type: "manual",
        message: "Selection Empty",
      });
    } else {
      props.clearErrors(props.registers.name);
    }

      //invoke onChangeFieldValidatiorHandle
      props.onChangeFieldValidationHandler && props.onChangeFieldValidationHandler(props.inputValues.id);
  }, [selectedItems]);

  function handleSelection(item: any) {
    
    const selectedResult = selectedItems.filter(
      (selected) => selected === item
    );

    if (selectedResult.length) {
      removeItem(item);
    } else {
      setSelectedItems((currents) => [...currents, item]);
    } 
  }

  function removeItem(item: any) {
    const removedSelection = selectedItems.filter(
      (selected) => selected !== item
    );
    setSelectedItems(removedSelection);
  }

  const values = props.getValues();

   //watch for changes and clear if reset
  const fieldWatchValue = useWatch({
    control: props.control,
    name: props.inputValues.id,
  });

  useEffect(() => {
    
    if(!fieldWatchValue){
      setSelectedItems([]);
    }
     
  },[fieldWatchValue]) 

  return (
    <div className="mb-10 flex">
      <div className="flex flex-col w-full">
        <label
          className="font-base text-lg leading-none text-site-gray-800"
          htmlFor={props.inputValues.id}
        >
          {props.inputValues.label}
        </label>
        <div className="flex flex-row gap-10 mt-10 justify-between">
          {items.map((item) => (
            <div key={item}>
              
              <label className="inline-flex items-center mt-3">
                <input onBlur={onBlurHandler} key={item}
                type={props.inputValues.type}
                value={item}
                checked={isSelected(item)}
                onChange={handleSelection.bind(this,item)} className="form-checkbox h-5 w-5 text-blue-600" /><span className="ml-2 text-gray-700">{item}</span>
            </label>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckboxGroupElement;
