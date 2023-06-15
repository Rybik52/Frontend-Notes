import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useToggle} from "../../hooks/useToggle.jsx";
import {deleteRecord} from "../../FetchData/imports.jsx";
import ChangeRecord from "../PopUps/ChangeRecord.jsx";

import './content.css';
import PageBar from "../PageBar/PageBar.jsx";

export default function ContentTable({ data, setPosts }) {
const [popupOpen, togglePopupOpen] = useToggle(false);
const [pageOpen, togglePageOpen] = useToggle(false);
const [selectedRecord, setSelectedRecord] = useState(null);
const [columns, setColumns] = useState(data.length); // Инициализируем количество колонок значением из массива data
    const addColumn = () => {
        setColumns(columns + 1);
    };
    return (
        <div style={{  width: '100vw',overflow: 'auto'}}>
        <table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Коллекция</th>
                <th>Теги</th>
                <th>Связанное</th>
                {Array.from({ length: columns }).map((_, index) => (
                    <th key={index}><input className='table-input' defaultValue={`новый ${index + 1}`}/></th>
                ))}
                <th>Дата создания</th>
                <th className='table-addCol' onClick={addColumn}>+</th>
                <th>...</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map((item) =>
                    <tr key={item.id}>
                        <td className='table-title' onClick={() => {
                            setSelectedRecord(item);
                            togglePageOpen();
                        }}>
                            {item.title}
                        </td>
                        <td>{item.text}</td>
                        <td>
                            {
                                item.tags.map((tag, indexTag) =>
                                    <span className={`table-tags table-tags_${tag}`} key={indexTag}>Тэг {tag}</span>)
                            }
                        </td>
                        <td>
                            {
                                item.recordIds.map((id, indexId) =>
                                    <span className='table-records'  id={`id-${item.title[0]}`} key={indexId}>Связаная {id === data.map(e=> e.id) ? data.map(e=> e.title) : id}</span>)
                            }
                        </td>
                        {Array.from({ length: columns }).map((_, index) => (
                            <td key={index}><input className='table-input' defaultValue='Новая ячейка'/></td>
                        ))}
                        <td>{new Date(item.date).toLocaleString("ru-RU")}</td>
                        <td onClick={() => {
                            setSelectedRecord(item);
                            togglePopupOpen();
                        }} className='table-change'>Изменить</td>
                        <td onClick={() => deleteRecord(item, setPosts)} className='table-delete'>Удалить</td>
                    </tr>
                )
            }
            </tbody>
        </table>
            <ChangeRecord setPosts={setPosts}
                          popupOpen={popupOpen}
                          togglePopupOpen={togglePopupOpen}
                          selectedRecord={selectedRecord}
            />
            <PageBar pageOpen={pageOpen} togglePageOpen={togglePageOpen} selectedRecord={selectedRecord} />
    </div>
    )
}

ContentTable.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number
    ]),
    setPosts: PropTypes.func
}