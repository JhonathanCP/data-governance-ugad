import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTableInfo } from "../api/entities.api";

export function TableInfo() {
  const [tableInfo, setTableInfo] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function loadTableInfo() {
      const res = await getTableInfo(params.id);
      setTableInfo(res.data);
    }
    loadTableInfo();
  }, []);

  const filteredAttributes = Object.entries(tableInfo).filter(([key]) => key !== 'table_name');

  return (
    <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer">
      <h1 className="text-white text-lg font-bold uppercase rounded-lg">
        {tableInfo.table_name}
      </h1>
      <h2 className="text-white text-md font-bold rounded-lg">Columns:</h2>
      {/* Render cards for each column */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {tableInfo.column_info_list &&
          tableInfo.column_info_list.map((column) => (
            <Link
              to={`/column-info/${column.id}`} // Reemplaza `/ruta` con tu ruta deseada
              key={column.id}
            >
              <div className="bg-white p-3">
                <h2 className="text-gray-800 font-bold">{column.column_name}</h2>
                <p>Nullable: {column.is_nullable ? "Yes" : "No"}</p>
                <p>Data Type: {column.data_type}</p>
              </div>
            </Link>
          ))}
      </div>
      
      
      {/* Render table with data_sample */}
      <div className="overflow-x-auto mt-8">
      <h2 className="text-white text-md font-bold rounded-lg">Sample data:</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              {tableInfo.data_sample &&
                tableInfo.data_sample.length > 0 &&
                Object.keys(tableInfo.data_sample[0]).map((key) => (
                  <th key={key} className="px-4 py-2  bg-zinc-700">{key}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {tableInfo.data_sample &&
              tableInfo.data_sample.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx} className="border px-4 py-2 bg-white text-black truncate">{value}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
