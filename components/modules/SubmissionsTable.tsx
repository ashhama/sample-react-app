import { MagnifyingGlass } from "phosphor-react";
import React from "react";
import { useTable, Column } from "react-table";
import TableModel from "../../models/TableModel";
import Dropdown from "../elements/Dropdown";

const SubmissionsTable: React.FC<{}> = (props) => {
  /*const data = React.useMemo(
    () => [
      new TableModel('111','ashham','email','form','date','time'),
        ,
        new TableModel('222','ashham','email','form','date','time'),
        new TableModel('333','ashham','email','form','date','time'),
        new TableModel('444','ashham','email','form','date','time'),
    ],

    []
  );*/
  const data: TableModel[] = makeData(20);

  const handleEdit = (row: TableModel) => {
    console.log(row);
  };

  function newStatement(): TableModel {
    return {
      id: "111",
      name: "ashham",
      email: "email",
      serviceType: "form",
      date: "date",
      time: "time",
    };
  }

  function makeData(len: number): TableModel[] {
    return new Array(len).fill(null).map(newStatement);
  }

  const columns = React.useMemo(
    () =>
      [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Service Type",
          accessor: "serviceType",
        },
        {
          Header: "Date",
          accessor: "date",
        },
        {
          Header: "Time",
          accessor: "time",
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: (row: { row: { original: any; }; }) => (
                    <Dropdown/>
                
            )
        },
      ] as Column<TableModel>[],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,
  } = tableInstance;

  return (
    // apply the table props

    <div className="flex flex-col">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle bg-white">
          <div className="py-4 px-8 flex justify-between">
            <div className="flex">
              <h3 className="text-2xl font-medium text-black my-auto">
                Submissions Summary
              </h3>
            </div>
            <div>
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="table-search"
                  className="border border-site-gray-300 text-lg text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-3 pr-10 p-2.5  placeholder-site-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
                <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                  <MagnifyingGlass color="#D2D2D2" size={24} />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <table
              className="min-w-full table-fixed"
              {...getTableProps()}
            >
              <thead className="bg-white border-y border-b-black border-t-site-gray-200">
                {
                  // Loop over the header rows

                  headerGroups.map((headerGroup) => (
                    // Apply the header row props

                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {
                        // Loop over the headers in each row

                        headerGroup.headers.map((column) => (
                          // Apply the header cell props

                          <th
                            scope="col"
                            className="py-4 px-8 text-sm font-medium text-left text-site-gray-800 capitalize"
                            {...column.getHeaderProps()}
                          >
                            {
                              // Render the header

                              column.render("Header")
                            }
                          </th>
                        ))
                      }
                    </tr>
                  ))
                }
              </thead>

              <tbody
                className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                {...getTableBodyProps()}
              >
                {
                  // Loop over the table rows

                  rows.map((row, index) => {
                    // Prepare the row for display

                    prepareRow(row);

                    return (
                      // Apply the row props

                      <tr
                        className={`${index % 2 === 0 ? "bg-site-blue-100 hover:bg-site-blue-200" : "bg-white hover:bg-gray-100"}`}
                        {...row.getRowProps()}
                      >
                        {
                          // Loop over the rows cells

                          row.cells.map((cell, index) => {
                            // Apply the cell props

                            return (
                              <td
                                className='py-4 px-8 text-sm font-normal text-left text-site-gray-800 capitalize'
                                {...cell.getCellProps()}
                              >
                                {
                                  // Render the cell contents

                                  cell.render("Cell")
                                }
                              </td>
                            );
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsTable;
