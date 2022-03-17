import React, { useEffect, useState } from "react";
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";

const CheckboxGroupElement: React.FC<{
  formId?: string;
  inputValues: FormInputModel;
  registers: UseFormRegisterReturn;
  initialValue?:any;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: any) => void;
}> = (props) => {
  const items: string[] = [
    ...(props.inputValues.selectOptions ? props.inputValues.selectOptions : []),
  ];
 
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  function isSelected(value: any) {
    return selectedItems.find((el) => el === value) ? true : false;
  }

  useEffect(() => {
    props.setValue(props.registers.name, selectedItems);
    props.onChange && props.onChange(selectedItems);
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
            <div>
              
              <label className="inline-flex items-center mt-3">
                <input key={item}
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
