import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getEntityTypes } from '../api/entityTypes.api';
import { getClassifications } from '../api/classifications.api';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({ isVisible }) => {
    const [entityTypes, setEntityTypes] = useState([]);
    const [classifications, setClassifications] = useState([]);
    const [selectedEntityType, setSelectedEntityType] = useState('');
    const [selectedClassification, setSelectedClassification] = useState('');
    const location = useLocation();

    useEffect(() => {
        async function fetchEntityTypes() {
        try {
            const response = await getEntityTypes();
            setEntityTypes(response.data);
        } catch (error) {
            console.error('Error fetching entity types:', error);
        }
        }

        async function fetchClassifications() {
        try {
            const response = await getClassifications();
            setClassifications(response.data);
        } catch (error) {
            console.error('Error fetching classifications:', error);
        }
        }

        fetchEntityTypes();
        fetchClassifications();
    }, []);

    const handleFilter = () => {
        // Construir la URL con los filtros seleccionados
        const queryParams = new URLSearchParams();
        if (selectedEntityType) {
        queryParams.set('type', selectedEntityType.name);
        }
        if (selectedClassification) {
        queryParams.set('classification', selectedClassification.name);
        }
        const search = queryParams.toString();

        // Redirigir al componente FilteredData con los filtros seleccionados
        window.location.href = `/filtered-data/${search}`;
    };

    return (
        <aside className={`menu ${isVisible ? 'is-active' : ''}`}>
        <ul className="menu-list">
            <li>
            <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                <button className="button is-primary is-fullwidth" aria-haspopup="true" aria-controls="dropdown-entity-type">
                    <span>Tipo de entidad</span>
                    <span className="icon is-small">
                        <FaSearch />
                    </span>
                </button>
                </div>
                <div className="dropdown-menu" id="dropdown-entity-type" role="menu">
                <div className="dropdown-content">
                    {entityTypes.map((entityType) => (
                    <a
                        key={entityType.id}
                        href="#"
                        className={`dropdown-item ${entityType === selectedEntityType ? 'is-active' : ''}`}
                        onClick={() => setSelectedEntityType(entityType)}
                    >
                        {entityType.name}
                    </a>                  
                    ))}
                </div>
                </div>
            </div>
            </li>
            <li>
            <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-classification">
                    <span>Clasificaciones</span>
                    <span className="icon is-small">
                    <FaSearch />
                    </span>
                </button>
                </div>
                <div className="dropdown-menu" id="dropdown-classification" role="menu">
                <div className="dropdown-content">
                    {classifications.map((classification) => (
                    <a
                        key={classification.id}
                        href="#"
                        className={`dropdown-item ${classification === selectedClassification ? 'is-active' : ''}`}
                        onClick={() => setSelectedClassification(classification)}
                    >
                        {classification.name}
                    </a>
                    ))}
                </div>
                </div>
            </div>
            </li>
            <li>
            <button className="button" onClick={handleFilter}>
                Filtrar
            </button>
            </li>
        </ul>
        </aside>
    );
};

export default Menu;
