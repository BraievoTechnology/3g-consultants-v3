import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, FilterIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
interface Column {
  key: string;
  header: string;
  width?: string;
  render?: (value: never, row: never) => React.ReactNode;
}
interface DataTableProps {
  columns: Column[];
  data: never[];
  searchPlaceholder?: string;
  filterOptions?: {
    label: string;
    options: {
      label: string;
      value: string;
    }[];
  };
  onSearch?: (value: string) => void;
  onFilter?: (value: string) => void;
  onEdit?: (row: never) => void;
  onDelete?: (row: never) => void;
  onRowClick?: (row: never) => void;
}
export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  searchPlaceholder = 'Search...',
  filterOptions,
  onSearch,
  onFilter,
  onEdit,
  onDelete,
  onRowClick
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('All');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) onSearch(value);
  };
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    if (onFilter) onFilter(value);
  };
  return <div className="bg-[#F9FAFB] rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white">
        <div className="relative w-full sm:w-auto">
          <input type="text" placeholder={searchPlaceholder} className="pl-10 pr-4 py-2 w-full sm:w-80 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchValue} onChange={handleSearch} />
          <SearchIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        {filterOptions && <div className="relative flex items-center w-full sm:w-auto">
            <FilterIcon size={18} className="absolute left-3 text-gray-400" />
            <select className="pl-10 pr-8 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white w-full" value={filterValue} onChange={handleFilter}>
              <option value="All">All</option>
              {filterOptions.options.map(option => <option key={option.value} value={option.value}>
                  {option.label}
                </option>)}
            </select>
            <div className="absolute right-3 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>}
      </div>
      <div className="overflow-x-auto bg-white">
        <table className="w-full hidden md:table">
          <thead className="bg-gray-50 text-left">
            <tr>
              {columns.map(column => <th key={column.key} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider" style={{
              width: column.width
            }}>
                  {column.header}
                </th>)}
              {(onEdit || onDelete) && <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? data.map((row, rowIndex) => <motion.tr key={rowIndex} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3,
            delay: rowIndex * 0.05
          }} className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => onRowClick && onRowClick(row)}>
                  {columns.map(column => <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>)}
                  {(onEdit || onDelete) && <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {onEdit && <button onClick={() => onEdit(row)} className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit2Icon size={18} />
                        </button>}
                      {onDelete && <button onClick={() => onDelete(row)} className="text-red-600 hover:text-red-900">
                          <Trash2Icon size={18} />
                        </button>}
                    </td>}
                </motion.tr>) : <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="px-6 py-4 text-center text-sm text-gray-500">
                  No data available
                </td>
              </tr>}
          </tbody>
        </table>
        <div className="md:hidden">
          {data.length > 0 ? data.map((row, rowIndex) => <motion.div key={rowIndex} initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.3,
          delay: rowIndex * 0.05
        }} className={`p-4 border-b border-gray-200 last:border-b-0 ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => onRowClick && onRowClick(row)}>
                {columns.map(column => <div key={column.key} className="mb-2 last:mb-0">
                    <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                      {column.header}
                    </div>
                    <div className="text-sm text-gray-900">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </div>
                  </div>)}
                {(onEdit || onDelete) && <div className="mt-4 flex justify-end space-x-3">
                    {onEdit && <button onClick={() => onEdit(row)} className="text-blue-600 hover:text-blue-900">
                        <Edit2Icon size={18} />
                      </button>}
                    {onDelete && <button onClick={() => onDelete(row)} className="text-red-600 hover:text-red-900">
                        <Trash2Icon size={18} />
                      </button>}
                  </div>}
              </motion.div>) : <div className="p-4 text-center text-sm text-gray-500">
              No data available
            </div>}
        </div>
      </div>
    </div>;
};