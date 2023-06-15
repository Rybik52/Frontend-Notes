import React from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import './pagebar.css';


export default function PageBar({pageOpen, togglePageOpen, selectedRecord}) {
    return (
        <div onClick={togglePageOpen} className={pageOpen ? 'page active' : 'page'}>
            <div onClick={e => e.stopPropagation()} className={pageOpen ? 'page__container active' : 'page__container'}>
                <div className='page__container-header'>

                    <NavLink to={`/record/${selectedRecord && selectedRecord.id}`}>
                        <button>Full size</button>
                    </NavLink>
                </div>
                {selectedRecord && <h1>{selectedRecord.title}</h1>}
                <ul>

                        {selectedRecord && selectedRecord.tags.join(', ')}

                </ul>
                {
                    selectedRecord && <p>{selectedRecord.text}</p>
                }
                {
                    selectedRecord && <p>Дата и время создания: {new Date(selectedRecord.date).toLocaleString("ru-RU")}</p>
                }
            </div>
        </div>
    );
}

PageBar.propTypes = {
    pageOpen: PropTypes.bool,
    togglePageOpen: PropTypes.func,
    selectedRecord: PropTypes.object
}
