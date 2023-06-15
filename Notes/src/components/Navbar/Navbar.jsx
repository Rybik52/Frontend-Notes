import React from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import './navbar.css';

export default function Navbar({isOpen, toggleIsOpen}) {
    return (
        <>
            <header style={{width: !isOpen ? '100vw' : 'calc(100vw - 200px'}}>
                <div className="page-title">
                    <span 
                        className='page-title__sidebar-arrow' 
                        onClick={toggleIsOpen}
                        style={{transform: !isOpen ? 'rotate(225deg)' : 'rotate(45deg)'}}
                        >
                    </span>
                    <NavLink to='/'>
                        <div className="page-title__title">Заметки</div>
                    </NavLink>
                </div>
                <div className="status-bar">Статус бар</div>
                <ul className="options">
                    <li>Поделиться</li>
                    <li>Поиск</li>
                    <li>...</li>
                </ul>
            </header>
        </>
    )
}

Navbar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleIsOpen: PropTypes.func
}