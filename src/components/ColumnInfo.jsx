import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getColumnInfo } from "../api/entities.api";

export function ColumnInfo() {
  const [columnInfo, setColumnInfo] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function loadColumnInfo() {
      const res = await getColumnInfo(params.id);
      setColumnInfo(res.data);
    }
    loadColumnInfo();
  }, []);

  const filteredAttributes = Object.entries(columnInfo).filter(([key]) => key !== 'column_name' && key !== 'table_ids');
  
  return (
    <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer">
      <h1 className="text-white font-bold uppercase rounded-lg">
        {columnInfo.column_name}
      </h1>
      {filteredAttributes.map(([key, value]) => (
        <div key={key} className="mb-4">
          <h2 className="text-white font-bold">{key}:</h2>
          <p className="text-slate-400">{value !== null ? value : "null"}</p>
        </div>
      ))}
      {columnInfo.table_ids && columnInfo.table_ids.length > 0 && (
        <div>
          <h2 className="text-white font-bold">Belongs to:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {columnInfo.table_ids.map((table) => (
              <Link
                to={`/table-info/${table.id}`} // Reemplaza `/ruta` con tu ruta deseada
                key={table.id}
              >
                <div className="bg-white p-3">
                  <h2 className="text-gray-800 font-bold">{table.name}</h2>
                  <p>{table.description ? table.description : "No description"}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
