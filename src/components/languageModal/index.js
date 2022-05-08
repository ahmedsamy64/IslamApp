import React, { useState, useEffect } from 'react'
import "./index.scss";
import { languages } from '../../constants/languages';

export default function LanguageModal(props) {

    const handleClickOutside = (event) => {
        console.log(">>>>event", event)
        props.isOpened && !(event?.target?.className?.startsWith('languageModal-container')) &&
            props.setLanguageModal(false)
    }

    document.addEventListener("mousedown", handleClickOutside)

    return (
        props.isOpened ? <div className="modalBackdropStyle" >
            <div className='languageModal-container'>
                <div className='languageModal-container__header'>
                    اختر لغتك
                </div>
                <div className='languageModal-container__body'>
                    {languages.map((elm, i) => {
                        return (
                            <span id={`selected-Language-${i}`} className='languageModal-container__body__language'
                             /* onClick={(element) => !selectedLanguage && selectLanguage(element.target.innerHTML, i)} */>
                                {elm}
                            </span>
                        )
                    })}
                </div>
            </div>
        </div> : null
    )
}
