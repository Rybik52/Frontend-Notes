import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ContentTable from '../Content/ContentTable';
import Modal from '../Modal/Modal';
import './main.css';

export default function Main({ popupOpen, togglePopupOpen }) {
    const baseURL = 'http://localhost:1114/api/v1/user/space/1/record';

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(baseURL)
            .then((res) => {
                setPosts(res.data);
            })
    }, [])

    const data = {
        title: "",
        tags: [],
        text: "",
        recordIds: []
    }

    const [inputData, setInputData] = useState(data)
    const handleInput = (event) => {
        setInputData({...inputData, [event.target.name]: event.target.value})
    }

    // const handleCheckbox = (event) => {
    //     setInputData({...inputData, [event.target.name]: event.target.value.push()})
    // }

    function handleSumbit(event){
        event.preventDefault()
        axios.post(baseURL, inputData)
            .then(response => console.log(`Резульат: ${response}`))
            .catch(err => console.log(`ОШИБКА: ${err}`))
    }    


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
            <ContentTable togglePopupOpen={togglePopupOpen} data={posts} />
            <Modal popupOpen={popupOpen} togglePopupOpen={togglePopupOpen}>
                <>
                <div className="popup-container">
                    <h1 className="popup-title">Добавить запись</h1>
                    <form onSubmit={handleSumbit} className='popup-form' method='post'>
                        <input onChange={handleInput} name="title" value={inputData.title} type="text" placeholder='Введите название' required />
                        <input onChange={handleInput} name="text" value={inputData.text} type="text" placeholder='Введите коллекцию' required />
                        {/* <input onChange={handleCheckbox} id='info' type="checkbox" name="tags" value={inputData.tags} />
                        <label htmlFor="info">info</label>
                        <input onChange={handleCheckbox} id='danger' type="checkbox" name="tags" value={inputData.tags} />
                        <label htmlFor="danger">danger</label>
                        <input onChange={handleCheckbox} id='warning' type="checkbox" name="tags" value={inputData.tags} />
                        <label htmlFor="warning">warning</label> */}

                        {/* <select onChange={handleInput} name="recordIds" value={inputData.recordIds} placeholder='Выберите связь'>
                            <option value="">Нет связей</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>    */}
                        <button>Добавить запись</button>
                    </form>
                </div>
                </>
            </Modal>
        </main>
    )
}

Main.propTypes = {
    popupOpen: PropTypes.bool.isRequired,
    togglePopupOpen: PropTypes.func
}