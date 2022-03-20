/**
 * Select Element
 *
 */

import React, { useRef, Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

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
import { CaretDown, Check } from "phosphor-react";
import FormInputModel from "../../models/FormInputModel";

const SelectElement: React.FC<{
  formId?: string;
  inputValues: FormInputModel;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  initialValue?: any;
  registers: UseFormRegisterReturn;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: any) => void;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  control?: Control<FieldValues, any>;
  onChangeFieldValidationHandler?: (
    fieldId: string,
    e?: React.FocusEvent<HTMLButtonElement>
  ) => void;
}> = (props) => {
  /* Initialize Values and functions */

  const items: string[] = [
    ...(props.inputValues.selectOptions ? props.inputValues.selectOptions : []),
  ];

  const [selected, setSelected] = useState();

  let values = props.getValues()[props.inputValues.id];

  //passes object onblur function to hook-form on blur function
  const onBlurHandler = (e: React.FocusEvent<HTMLButtonElement>) => {
    props.registers.onBlur && props.registers.onBlur(e);
  };

  /* --------------------------------------- */

  /* Handle Item Selection */

  useEffect(() => {
    //1. update the form state when value is selected, and invoke any handlers
    props.initialValue && setSelected(props.initialValue);
    props.setValue(props.registers.name, selected);

    //2. Handle Errors
    if (!selected) {
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
  }, [selected]);

  /* --------------------------------------- */

  /* Watch for Changes in the field and reset value in the event that the form is reset */

  const fieldWatchValue = useWatch({
    control: props.control,
    name: props.inputValues.id,
  });

  useEffect(() => {
    if (!fieldWatchValue) {
      setSelected(props.initialValue);
    }
  }, [fieldWatchValue]);

  /* --------------------------------------- */

  return (
    <div className="mb-10">
      <input type="hidden" />
      <Listbox value={values} onChange={setSelected}>
        <Listbox.Label className="font-base text-lg leading-none text-site-gray-800">
          {props.inputValues.label}
        </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button
            {...props.registers}
            onBlur={onBlurHandler}
            className="flex items-center h-11 px-4 w-full border border-site-grey-300 mt-3 rounded-lg focus:outline-none focus:ring-2 overflow-hidden"
          >
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
