import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export function Search() {
    return (    
        <p class="control has-icons-left">
            <input class="input is-primary" type="text" placeholder="Buscar entidad..."></input>
            <span class="icon is-left">
                <FaSearch />
            </span>
        </p>  
    );
}
