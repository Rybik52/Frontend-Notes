import React from 'react';
import PropTypes from 'prop-types';
import './content.css';

export default function ContentTree({ data }) {
    return (
        <div className='container'>
            {
            data.map((elems, index) => 
                <div key={index} className="container__item">
                    <span className="item__arrow" />
                    <div className="item__title">{elems.recordTitle}</div>
                    <div className="item__caption">
                        <div className="item__caption-collection">{elems.сollection}</div>
                        <div className="item__caption-tags">
                            {
                                elems.tags.map((tag, indexTag) => <span className={`table-tags table-tags_${tag}`} key={indexTag}>Тэг {tag}</span>)
                            }
                        </div>
                    </div>
                </div>
            )
        }
        </div>
    )
}

ContentTree.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}
