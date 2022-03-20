/**
 * This is the Component Used to display submitted forms. Forms are retrieved from firebase and displayed in a table.
 *
 */

import { MagnifyingGlass } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, Column } from "react-table";
import TableModel from "../../models/TableModel";
import Dropdown from "../elements/Dropdown";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../config/firebase";
import { useRouter } from "next/router";
import { matchSorter } from "match-sorter";
import TableSearchElement from "../elements/TableSearchElement";
import ClientOnlyPortal from "../layouts/ClientOnlyPortal";
import BottomNavLayout from "../layouts/BottomNavLayout";
import BottomNavSubmissionAll from "../elements/BottomNavSubmissionAll";

const SubmissionsTable: React.FC<{}> = (props) => {
  const router = useRouter();
  const [data, setData] = useState<TableModel[]>([]);
  const [dataCount, setDataCount] = useState(0);

  const onDeleteSubmission = async (row: {
    documentId: string;
    rowId: number;
  }) => {
    const awaitResponse = await deleteDoc(doc(db, "forms", row.documentId));

    setData((currentData) => {
      const newData = [...currentData];
      newData.splice(row.rowId, 1);
      return newData;
    });
  };

  const onEditSubmission = async (row: {
    documentId: string;
    rowId: number;
  }) => {
    router.replace(`/submissions/${row.documentId}`);
  };

  const addNewSubmissionHandler = () => {
    router.replace("/submissions/new");
  };

  const getAllSubmissions = async () => {
    const querySnapshot = await getDocs(collection(db, "forms"));
    querySnapshot.forEach((doc) => {
      //create date object with epoch time
      const dateTime = new Date(doc.data().date);

      setData((currentData) => [
        ...currentData,
        new TableModel(
          doc.id,
          doc.data().name,
          doc.data().email,
          doc.data()["service-type"],
          dateTime.toDateString(),
          dateTime.toTimeString()
        ),
      ]);
    });
  };

  
  useEffect(() => {
    getAllSubmissions();
  }, []);

  
  useEffect(() => {
    setDataCount(data.length);
  }, [data]);

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
          Cell: (row: { row: any }) => (
            <Dropdown
              onDelete={onDeleteSubmission}
              onEditClicked={onEditSubmission}
              documentId={row.row.original.id}
              rowId={row.row.index}
            />
          ),
        },
      ] as Column<TableModel>[],
    []
  );

  /* ------------- Table Setup ------------- */

  // Define a default UI for filtering
  function DefaultColumnFilter(column: {
    filterValue: string;
    preFilteredRows: any[];
    setFilter: (e: any) => void;
  }) {
    const count = column.preFilteredRows.length;

    return (
      <input
        value={column.filterValue || ""}
        onChange={(e) => {
          column.setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  function fuzzyTextFilterFn(rows: any[], id: any, filterValue: any) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = (val: any) => !val;

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows: any[], id: any, filterValue: string) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  return (
    // apply the table props
    <>
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
                  <TableSearchElement
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                  <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                    <MagnifyingGlass color="#D2D2D2" size={24} />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <table className="min-w-full table-fixed" {...getTableProps()}>
                <thead className="bg-white border-y border-b-black border-t-site-gray-200">
                  {
                    // Loop over the header rows

                    headerGroups.map((headerGroup, index) => (
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

                    //if rows is empty
                    rows.length === 0 ? (
                      <div className="absolute inset-x-0 flex items-center w-full justify-center space-x-2 animate-pulse animate-animated animate-infinite my-14">
                        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                      </div>
                    ) : (
                      rows.map((row, index) => {
                        // Prepare the row for display

                        prepareRow(row);

                        return (
                          // Apply the row props

                          <tr
                            className={`${
                              index % 2 === 0
                                ? "bg-site-blue-100 hover:bg-site-blue-200"
                                : "bg-white hover:bg-gray-100"
                            }`}
                            {...row.getRowProps()}
                          >
                            {
                              // Loop over the rows cells

                              row.cells.map((cell, index) => {
                                // Apply the cell props

                                return (
                                  <td
                                    className="py-4 px-8 text-sm font-normal text-left text-site-gray-800 capitalize"
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
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ClientOnlyPortal selector="#portal-bottom-nav">
        <BottomNavLayout>
          <BottomNavSubmissionAll
            resultCount={dataCount}
            addNewSubmissionHandler={addNewSubmissionHandler}
          />
        </BottomNavLayout>
      </ClientOnlyPortal>
    </>
  );
};

export default SubmissionsTable;
