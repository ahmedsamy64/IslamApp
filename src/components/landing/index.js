import React, { useState, createContext, useContext } from 'react'
import "./index.scss"
import logo from "../../assets/logo.png"
import cover from "../../assets/cover.png"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../context";
import { languages } from '../../constants/languages';

//const LanguageContext = createContext();

export default function Landing(props) {
    const [language, setCurrentLanguage] = useLanguage(useLanguage);
    let history = useHistory();
    const [entered, setEntered] = useState(false);
    const [selectedLanguage, setLanguage] = useState(null);

    const LoadingComponent = () => (<div className='landing-container__loading-btn' onClick={() => setEntered(true)} >
        <div className='landing-container__loading-btn__2'>
            <div className='landing-container__loading-btn__3'>
                <div className='landing-container__loading-btn__4' />
            </div>
        </div>
    </div >)

    const selectLanguage = (lang, i) => {
        setCurrentLanguage(lang)
        setLanguage(lang);
        sessionStorage.setItem('language', lang);
        document.getElementById(`selected-Language-${i}`).classList.toggle("language-selected");
        document.getElementById('language-table').classList.toggle("landing-container__with-border__table__faded");
        setTimeout(() => {
            history.replace("/IslamApp/home")
        }, 3200);
    }

    return (
        <>
            <div className={entered ? `landing-container__with-border` : `landing-container`}>
                {/* the initial start btn */}
                {entered &&
                    <div id="language-table" className='landing-container__with-border__table'>
                        {languages.map((elm, i) => {
                            return (
                                <span id={`selected-Language-${i}`} onClick={(element) => !selectedLanguage && selectLanguage(element.target.innerHTML, i)}>
                                    {elm}
                                </span>
                            )
                        })}
                    </div>}
                {!entered && <LoadingComponent />}
                {/* custom border */}
                {entered &&
                    <>
                        <div className="bottomBorder" />
                        <div className="rightBorder" />
                    </>}
                {/* welcome div */}
                {selectedLanguage &&
                    <div className='landing-container__with-border__welcome-div' >
                        مرحبا
                    </div>}
            </div>
            {/* app logo */}
            {/* !selectedLanguage && */ <img className={entered ? "landing-container__with-border__app-logo" : "landing-container__app-logo"} src={logo} />}
        </>
    )
}
