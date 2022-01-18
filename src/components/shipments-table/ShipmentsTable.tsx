//@ts-nocheck
//Had to disable ts on this file because of library not having updated the types on their repo yet

import React from "react";
import { Row, usePagination, useSortBy, useTable } from "react-table";

const ShipmentsTable = ({ data, loading }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Origin",
        accessor: "origin",
      },
      {
        Header: "Mode",
        accessor: "mode",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Total",
        accessor: "total",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    state,
    pageOptions,

    prepareRow,
  } = useTable<T>(
    { columns, data, initialState: { pageIndex: 0, pageSize: 20 } },
    useSortBy,
    usePagination
  );

  const { pageIndex } = state;

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <table {...getTableProps()} className="w-full max-h-9/10">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="rounded-md">
              {headerGroup.headers.map((column) => (
                <th
                  className="text-left px-2 py-1"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page?.length > 0 ? (
            page.map((row: Row<any>) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="odd:bg-slate-200 max-h-16"
                >
                  {row.cells.map(
                    (cell: {
                      getCellProps: () => JSX.IntrinsicAttributes &
                        React.ClassAttributes<HTMLTableDataCellElement> &
                        React.TdHTMLAttributes<HTMLTableDataCellElement>;
                      render: (
                        arg0: string
                      ) =>
                        | boolean
                        | React.ReactFragment
                        | React.ReactChild
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => {
                      return (
                        <td {...cell.getCellProps()} className="px-2 py-1">
                          {cell.render("Cell")}
                        </td>
                      );
                    }
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="p-8 font-bold">No results matched your search</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex w-full items-center justify-end">
        <span className="mr-4">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => previousPage()}
          className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg disabled:cursor-not-allowed disabled:bg-inherit border"
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          disabled={!canNextPage}
          onClick={() => nextPage()}
          className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg disabled:cursor-not-allowed disabled:bg-inherit border"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ShipmentsTable;
