import React from 'react';
import ContentTable from '../Content/ContentTable';
import ContentTree from '../Content/ContentTree';
import './main.css';

export default function Main() {
    const data = 
    [
        {
            id: '1',
            tags: [1],
            timestamp: '01.01.2023 18:50',
            recordTitle: 'Запись 1',
            recordId: [1, 2],
            сollection: 'Коллекция 1'
        },
        {
            id: '2',
            tags: [2],
            timestamp: '01.01.2023 18:50',
            recordTitle: 'Запись 2',
            recordId: [4, 5],
            сollection: 'Коллекция 2'
        },
        {
            id: '3',
            tags: [3, 1],
            timestamp: '01.01.2023 18:50',
            recordTitle: 'Запись 3',
            recordId: [1, 2],
            сollection: 'Коллекция 3'
        },
    ];

    return (
        <main>
            <textarea placeholder='Поле комментария для данного пространства записей, здесь обычно пишут что это, зачем, для кого и т.д... &#13;&#10;Оно может быть заполнено оставлено пустым'></textarea>
            <ul className="tabs">
                <li>Заметки</li>
            </ul>
            <div className="content-settings">
                <div className='content-settings__nav'>
                    <div className="content-settings__nav-view">Отображение: <br />Таблица</div>
                    <div className="content-settings__nav-options">...</div>
                </div>
                <button className='content-settings__create'>Создать</button>
            </div>
            {/* <ContentTable data={data} /> */}
            <ContentTree data={data} />
        </main>
    )
}
