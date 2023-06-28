import { useNavigate } from "react-router-dom";

export function EntityTypeCard({ entityType }) {
  const navigate = useNavigate();

  return (
    
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
    >
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            {entityType.name}
          </p>
          <button className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </header>
        <div className="card-content">
          <div className="content">
            {entityType.description}
          </div>
        </div>
        <footer className="card-footer">
          <a href={`/entitytypes/${entityType.id}`} className="card-footer-item">Edit</a>
        </footer>
      </div>
    </div>
  );
}
