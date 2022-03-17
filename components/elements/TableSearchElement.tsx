import React from "react";
import { useAsyncDebounce } from "react-table";

const TableSearchElement: React.FC<{
        preGlobalFilteredRows: any[];
        globalFilter: any;
        setGlobalFilter: (params: any) => void;
      
  }> = (props) => {


    const count = props.preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(props.globalFilter);
    const onChange = useAsyncDebounce((value) => {
        props.setGlobalFilter(value || undefined);
    }, 200);

    return (  
      
        <input
        type="text"
        id="table-search"
        className="border border-site-gray-300 text-lg text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-3 pr-10 p-2.5  placeholder-site-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          
        />
      
    );
  };


export default React.memo(TableSearchElement);