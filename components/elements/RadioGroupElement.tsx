import React, { useEffect } from "react";
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";

const RadioGroupElement: React.FC<{
  formId?: string;
  inputValues: FormInputModel;
  registers: UseFormRegisterReturn;
  initialValue?:any;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: any) => void;
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
  }, [radio]);

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
            <div>
              <input
                key={item}
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
