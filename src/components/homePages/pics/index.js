import React, { useState } from 'react'
import picsLogo from "../../../assets/لوحات_رئيسية.png";
import "./index.scss"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../../context";

export default function Pics() {
    let history = useHistory();
    const [language, setCurrentLanguage] = useLanguage(useLanguage);
    const [cardSelected, setCardSelection] = useState(false);

    const handleRestart = () => {
        setCurrentLanguage(null);
        sessionStorage.setItem('language', "");
        document.getElementById("home-container").classList.toggle("home-container__fading");
        setTimeout(() => history.replace("/IslamApp"), 1000);
    }

    //   const handleSelection = (selection) => {
    //     document.getElementById("home-container").classList.replace("home-container", `${selection}-container`);
    //     document.getElementById("div-titles").classList.replace("home-container__div-titles", `${selection}-container__div-titles`);
    //     setCardSelection(true);
    //     setTimeout(() => history.push(selection), 1500);
    //   }
    return (
        <div id="home-container" className='option-container' >
            <div id="div-titles" className='option-container__div-titles'>
                <div style={{ backgroundColor: "#c14e00" }} /* onClick={() => handleSelection("pics")} */>
                    اللوحات
                </div>
            </div>
            <div className='option-container__main-div' /* onClick={() => handleSelection("childs")} */>
                <img className='option-container__main-div__picsImg' src={picsLogo} />
            </div>
            <div className='option-container__main-div__whatTheyDo' style={{ animation: "none", top: "16vh" }}>
                <div className='option-container__main-div__whatTheyDo__clickMask' />
                <div className='option-container__main-div__whatTheyDo__name' >
                    ماذا يصنعون
                </div>
            </div>
            <div className='option-container__main-div__knowledgePics' style={{ animation: "none", top: "16vh" }}>
                <div className='option-container__main-div__knowledgePics__clickMask' />
                <div className='option-container__main-div__knowledgePics__name' >
                    لوحات المعرفة
                </div>
            </div>
            <div className='home-container__restart' style={{ animation: "none", left: 0 }} onClick={handleRestart}>
                إبدأ من جديد
            </div>
            <div className='home-container__goToHome' style={{ animation: 'none', bottom: 0 }} onClick={() => history.replace("/IslamApp/home")}>
                القائمة الرئيسية
            </div>
        </div >
    )
}