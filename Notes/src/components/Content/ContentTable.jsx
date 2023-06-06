import React from 'react';
import PropTypes from 'prop-types';
import './content.css';

export default function ContentTable({ data }) {
    return (
        <table>
        <thead>
            <tr>
                <th>Название</th>
                <th>Коллекция</th>
                <th>Теги</th>
                <th>Связанное</th>
                <th>Дата создания</th>
                <th>+</th>
                <th>...</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((elems, index) => 
                    <tr key={index}>
                        <td>{elems.recordTitle}</td>
                        <td>{elems.сollection}</td>
                        <td>
                            {
                                elems.tags.map((tag, indexTag) => 
                                <span 
                                    className={`table-tags table-tags_${tag}`} 
                                    key={indexTag}>Тэг {tag}</span>)
                            }
                        </td>
                        <td>
                            {
                                elems.recordId.map((id, indexId) => 
                                <span 
                                    className='table-records' 
                                    key={indexId}>Связаная {id}</span>)
                            }
                        </td>
                        <td>{elems.timestamp}</td>
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
    ])
}
