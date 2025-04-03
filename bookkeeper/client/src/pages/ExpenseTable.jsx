// ExpenseTable.jsx
// React table with editable inputs, dropdowns, and date pickers

import React, { useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const categoryOptions = ['Utilities', 'Marketing', 'Travel', 'Meals', 'Software'];

const EditableInput = ({ value: initialValue, onUpdate }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <input
      className="border rounded p-1 w-full"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onUpdate(value)}
    />
  );
};

const EditableDropdown = ({ value: initialValue, onUpdate, options }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <select
      className="border rounded p-1 w-full"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onUpdate(e.target.value);
      }}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
};

const EditableDate = ({ value: initialValue, onUpdate }) => {
  const [value, setValue] = useState(new Date(initialValue));
  return (
    <DatePicker
      selected={value}
      onChange={(date) => {
        setValue(date);
        onUpdate(date);
      }}
      className="border rounded p-1 w-full"
    />
  );
};

const defaultData = [
  {
    category: '',
    business: '',
    amount: '',
    merchant: '',
    date: new Date(),
    connectedBusiness: '',
    bankAccount: '',
    comments: '',
  },
];

export default function ExpenseTable() {
  const [data, setData] = useState(defaultData);

  const updateData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const columns = [
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ getValue, row, column, table }) => (
        <EditableDropdown
          value={getValue()}
          onUpdate={(val) => updateData(row.index, column.id, val)}
          options={categoryOptions}
        />
      ),
    },
    {
      accessorKey: 'business',
      header: 'Business',
      cell: ({ getValue, row, column }) => (
        <EditableInput
          value={getValue()}
          onUpdate={(val) => updateData(row.index, column.id, val)}
        />
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ getValue, row, column }) => (
        <EditableInput
          value={getValue()}
          onUpdate={(val) => updateData(row.index, column.id, val)}
        />
      ),
    },
    {
      accessorKey: 'merchant',
      header: 'Merchant',
      cell: ({ getValue, row, column }) => (
        <EditableInput
          value={getValue()}
          onUpdate={(val) => updateData(row.index, column.id, val)}
        />
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ getValue, row, column }) => (
        <EditableDate
          value={getValue()}
          onUpdate={(val) => updateData(row.index, column.id, val)}
        />
      ),
    },
    {
      accessorKey: 'connectedBusiness',
      header: 'Connected Business',
      cell: ({ getValue, row, column }) => (
        <EditableInput
          value={getValue()}
          onUpdate={(val) => updateData(row.index, column.id, val)}
        />
      ),
    },
    {
      accessorKey: 'bankAccount',
      header: 'Bank Account',
      cell: ({ getValue, row, column }) => (
        <EditableInput
          value={getValue()}
          onUpdate={(val) => updateData(row.index, column.id, val)}
        />
      ),
    },
    {
      accessorKey: 'comments',
      header: 'Comments',
      cell: ({ getValue, row, column }) => (
        <EditableInput
          value={getValue()}
          onUpdate={(val) => updateData(row.index, column.id, val)}
        />
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <table className="w-full border">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="p-2 border bg-gray-100">
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border">
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
