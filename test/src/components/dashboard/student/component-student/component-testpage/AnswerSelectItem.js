
import { memo } from 'react';

function AnswerSelectItem({question,index,valueSelected,color,disabled}) {

    return (
        <li className={`answer-item answer-item-${index+1}`} >
            <span>{index < 9 ? `0${index+1}`:`${index+1}`}</span>
            <select className="answer-select" 
                data-id={question.id} 
                data-value={question.id} 
                value={valueSelected}
                style = {color ? {backgroundColor: 'var(--highlight-color)'} : {backgroundColor: 'var(--white-color)'}}
                disabled = {disabled}
            >
                <option value="">.</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>     
            </select>
        </li>
    );
}

export default memo(AnswerSelectItem)