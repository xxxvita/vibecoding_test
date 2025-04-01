'use client';

import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  ExpandedState,
} from '@tanstack/react-table';
import React from 'react';

type Person = {
  id: number;
  name: string;
  age: number;
  status: 'active' | 'inactive';
  details: {
    email: string;
    phone: string;
    address: string;
  };
};

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        info.getValue() === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {info.getValue()}
      </span>
    ),
  }),
];

const DetailRow = ({ details }: { details: Person['details'] }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-sm font-medium text-gray-500">Email</p>
        <p className="mt-1">{details.email}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Phone</p>
        <p className="mt-1">{details.phone}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Address</p>
        <p className="mt-1">{details.address}</p>
      </div>
    </div>
  </div>
);

const mockData: Person[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    status: 'active',
    details: {
      email: 'john@example.com',
      phone: '+1 234 567 890',
      address: '123 Main St, City',
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 25,
    status: 'inactive',
    details: {
      email: 'jane@example.com',
      phone: '+1 234 567 891',
      address: '456 Oak Ave, Town',
    },
  },
];

export default function DataGrid() {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data: mockData,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <th className="w-12 px-6 py-3"></th>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <React.Fragment key={row.id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => row.toggleExpanded()}
                >
                  <td className="px-6 py-4">
                    <button
                      className={`transform transition-transform ${
                        row.getIsExpanded() ? 'rotate-90' : ''
                      }`}
                    >
                      ▶
                    </button>
                  </td>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4">
                      <DetailRow details={row.original.details} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 