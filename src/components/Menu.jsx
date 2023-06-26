import React from 'react';

const Menu = ({ isVisible }) => {
    return (
        <aside className={`menu ${isVisible ? 'is-active' : ''}`}>
            <ul className="menu-list">
                <li>
                <a href="/">Inicio</a>
                </li>
                <li>
                <a href="/about">Acerca de</a>
                </li>
                <li>
                <a href="/contact">Contacto</a>
                </li>
                {/* Agrega más elementos de menú según sea necesario */}
            </ul>
        </aside>
    );
};

export default Menu;
