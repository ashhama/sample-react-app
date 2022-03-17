import React, { useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import FormInputModel from "../../models/FormInputModel";

const MultiSelectElement: React.FC<{
  formId?: string;
  inputValues: FormInputModel;
  initialValue?:any;
  registers: UseFormRegisterReturn;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: any) => void;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}> = (props) => {
  const items: string[] = [
    ...(props.inputValues.selectOptions ? props.inputValues.selectOptions : []),
  ];

  const [selectedItems, setSelectedItems] = useState([items[0]]);

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
    <div className="mb-10">
    <Listbox
      as="div"
      className=""
      value={values.name}
      onChange={handleSelection}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="font-base text-lg leading-none text-site-gray-800">
            {props.inputValues.label}
          </Listbox.Label>
          <div className="relative">
            <span className="inline-block w-full rounded-md shadow-sm">
              <Listbox.Button className="flex items-center h-11 px-4 w-full border border-site-grey-300 mt-3 rounded-lg focus:outline-none focus:ring-2 overflow-hidden text-site-gray-400">
                {!selectedItems.length && "One or more persons"}
                {selectedItems.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center px-1 mr-1 mt-1 rounded text-white bg-gray-400"
                  >
                    {item}
                    <div
                      className="ml-1 bg-gray-100 rounded-full cursor-pointer"
                      onClick={() => removeItem(item)}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                          fill="#4A5568"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
                <span className="absolute right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Listbox.Button>
            </span>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
            >
              <Listbox.Options
                static
                className="z-40 max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
              >
                {items.map((item) => {
                  const selected = isSelected(item);
                  return (
                    <Listbox.Option key={item} value={item}>
                      {({ active }) => (
                        <div
                          className={`${
                            active ? "text-white bg-blue-600" : "text-gray-900"
                          } cursor-default select-none relative py-2 pl-8 pr-4`}
                        >
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal"
                            } block truncate`}
                          >
                            {item}
                          </span>
                          {selected && (
                            <span
                              className={`${
                                active ? "text-white" : "text-blue-600"
                              } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
    </div>
  );
};
export default MultiSelectElement;
