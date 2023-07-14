import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getEntitiesByName } from '../api/entities.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
        const response = await getEntitiesByName(searchQuery);
        const entity = response.data;
        setSearchResult(entity);

        if (entity) {
            // Redirigir según el tipo de entidad encontrada
            switch (entity.entityType) {
            case 'Database':
                navigate(`/database-info/${entity.id}`);
                break;
            case 'Table':
                navigate(`/table-info/${entity.id}`);
                break;
            case 'Column':
                navigate(`/column-info/${entity.id}`);
                break;
            default:
                break;
            }
        } else {
            toast.error('No se encontraron resultados');
        }
        } catch (error) {
        console.error('Error searching entity:', error);
        setSearchResult(null);
        toast.error('No existe la entidad');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        handleSearch();
        }
    };

    return (
        <div className="field has-addons">
        <div className="control has-icons-left is-expanded">
            <input
            className="input is-primary"
            type="text"
            placeholder="Buscar entidad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Agregar el controlador de eventos onKeyDown
            />
            <span className="icon is-left">
            <FaSearch />
            </span>
        </div>
        <div className="control">
            <button className="button is-primary" onClick={handleSearch}>
            Buscar
            </button>
        </div>
        </div>
    );
}
