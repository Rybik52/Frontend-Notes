import React from 'react';
import PropTypes from 'prop-types';
import './content.css';

export default function ContentTable({ data, togglePopupOpen }) {
    return (
        <table>
        <thead>
            <tr>
                <th>Название</th>
                <th>Коллекция</th>
                <th>Теги</th>
                <th>Связанное</th>
                <th>Дата создания</th>
                <th onClick={togglePopupOpen} className='add-record'>+</th>
                <th>...</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((elems, index) => 
                    <tr key={index}>
                        <td>{elems.title}</td>
                        <td>{elems.text}</td>
                        <td>
                            {
                                elems.tags.map((tag, indexTag) => 
                                <span 
                                    className={`table-tags`} 
                                    key={indexTag}>Тэг {tag}</span>)
                            }
                        </td>
                        <td>
                            {
                                elems.recordIds.map((id, indexId) => 
                                <span 
                                    className='table-records' 
                                    key={indexId}>Связаная {id}</span>)
                            }
                        </td>
                        <td>{new Date(elems.date).toLocaleString("ru-RU")}</td>
                        <td>Изменить</td>
                        <td>Удалить</td>
                    </tr>
                )
            }
        </tbody>
        </table>
    )
}

ContentTable.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    togglePopupOpen: PropTypes.func
}
