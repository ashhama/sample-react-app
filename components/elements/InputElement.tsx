import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

const InputElement: React.FC<{ registers: UseFormRegisterReturn;  id: string; label: string; type: string; placeholder:string }> = (props) => {
  return (
    <div className="mb-10">
      <label className="font-base text-lg leading-none text-site-gray-800" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        className="flex items-center h-11 px-4 w-full border border-site-grey-300 mt-3 rounded-lg focus:outline-none focus:ring-2"
        placeholder={props.placeholder}
        {...props.registers}
      />
    </div>
  );
};

export default InputElement;
