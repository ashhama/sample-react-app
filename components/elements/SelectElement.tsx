import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import { CaretDown, Check } from "phosphor-react";
import FormInputModel from "../../models/FormInputModel";
import React from "react";

const SelectElement: React.FC<{
  formId?: string;
  inputValues: FormInputModel;
  initialValue?:any;
  registers: UseFormRegisterReturn;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: any) => void;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}> = (props) => {
  const items: string[] = [...props.inputValues.selectOptions ? props.inputValues.selectOptions : []];

  const [selected, setSelected] = useState();
  
  const values = props.getValues();
  
  useEffect(() => {
    props.initialValue && setSelected(props.initialValue);
    props.setValue(props.registers.name, selected);
    //props.onChange && props.onChange(selected);
  }, [selected]);

  function onChangeHandler(e: React.FocusEvent<HTMLInputElement>) {
    
  }

  return (
    <div className="mb-10">
      <Listbox value={values.name} onChange={setSelected}>
        <Listbox.Label className="font-base text-lg leading-none text-site-gray-800">
          {props.inputValues.label}
        </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="flex items-center h-11 px-4 w-full border border-site-grey-300 mt-3 rounded-lg focus:outline-none focus:ring-2 overflow-hidden">
            <span className="block truncate">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <CaretDown color="#CBCBCB" size={18} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-40 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active
                        ? "text-blue-900 bg-site-blue-200"
                        : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute left-0 flex items-center pl-3 text-amber-600">
                          <Check color="#003962" size={18} />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectElement;
