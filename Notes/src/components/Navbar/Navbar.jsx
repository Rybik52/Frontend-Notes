import React from 'react';
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
                    <div className="page-title__title">Заметки</div>
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