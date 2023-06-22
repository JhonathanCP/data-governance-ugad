import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex justify-between py-3 items-center">
      <Link to="/entities">
        <h1 className="font-bold text-3xl mb-4">UGAD Data Governance App</h1>
      </Link>
      <div className="flex justify-between py-3 items-center">
        <button className="bg-blue-500 p-2 rounded-lg mr-3">
          <Link to="/entitytypes" className="text-white">Entity Types</Link>
        </button>
        <button className="bg-blue-500 p-2 rounded-lg mr-3">
          <Link to="/entitytypes-create" className="text-white">Create Entity Type</Link>
        </button>
        <button className="bg-blue-500 p-2 rounded-lg mr-3">
          <Link to="/entities" className="text-white">Entities</Link>
        </button> 
        <button className="bg-blue-500 p-2 rounded-lg">
          <Link to="/graph-test" className="text-white">DB Graph</Link>
        </button>
      </div>      
    </div>
  );
}
