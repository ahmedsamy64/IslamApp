import React, { useState, } from 'react'
import childLogo from "../../../../assets/الاطفال_رئيسية.png";
import child_pics from "../../../../assets/أطفال_لوحات_خلفية.png";
import child_pic1 from "../../../../assets/أطفال_لوحة1.png";
import child_pic2 from "../../../../assets/أطفال_لوحة2.png";
import child_pic3 from "../../../../assets/أطفال_لوحة3.png";
import "./index.scss"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../../../context";
import axios from 'axios';
import LanguageModal from "../../../languageModal";


export default function ChildsPics() {

    let history = useHistory();
    const [language, setCurrentLanguage] = useLanguage(useLanguage);
    const [loading, setLoading] = useState(false);
    const [imgModalOpened, setImgModalOpened] = useState(false);
    const [downloadChangeLangModal, setDownloadChangeLangModal] = useState(false)
    const [currentImgURL, setCurrentImgURL] = useState("")
    const [languageModalOpened, setLanguageModal] = useState(false)

    const handleRestart = () => {
        setCurrentLanguage(null);
        sessionStorage.setItem('language', "");
        document.getElementById("home-container").classList.toggle("home-container__fading");
        setTimeout(() => history.replace("/IslamApp"), 1000);
    }

    const handleClickOutside = (eve) => {
        if (downloadChangeLangModal && !(eve?.target?.className?.startsWith("modalBackdropStyle__downloadChangeLang"))) {
            setDownloadChangeLangModal(false)
        }
    }
    document.addEventListener("mousedown", handleClickOutside)

    const handlePicTransition = (element) => {
        setLoading(true)
        if (element.target.className === "childPicsPage__rightPic" && !loading) {
            document.getElementsByClassName("childPicsPage__leftPic")[0].className = "childPicsPage__leftPicFaded";
            document.getElementsByClassName("childPicsPage__mainPic")[0].className = "childPicsPage__leftPic";
            document.getElementsByClassName("childPicsPage__rightPic")[0].className = "childPicsPage__mainPic";
            document.getElementsByClassName("childPicsPage__rightPicFaded")[0].className = "childPicsPage__rightPic";
            setTimeout(() => document.getElementsByClassName("childPicsPage__leftPicFaded")[0].className = "childPicsPage__rightPicFaded", 1100);
            setTimeout(() => setLoading(false), 1700);
        }
        else if (element.target.className === "childPicsPage__leftPic" && !loading) {
            document.getElementsByClassName("childPicsPage__rightPic")[0].className = "childPicsPage__rightPicFaded";
            document.getElementsByClassName("childPicsPage__mainPic")[0].className = "childPicsPage__rightPic";
            document.getElementsByClassName("childPicsPage__leftPic")[0].className = "childPicsPage__mainPic";
            document.getElementsByClassName("childPicsPage__leftPicFaded")[0].className = "childPicsPage__leftPic";
            setTimeout(() => document.getElementsByClassName("childPicsPage__rightPicFaded")[0].className = "childPicsPage__leftPicFaded", 1100);
            setTimeout(() => setLoading(false), 1700);
        }
        else if (element.target.className === "childPicsPage__mainPic" && !loading) {
            setCurrentImgURL(element.target.src)
            setImgModalOpened(true)
            setTimeout(() => setLoading(false), 100);
        }
        else setLoading(false)
    }
    const download = (url) => {
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob'
        }).then((res) => {
            const newUrl = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = newUrl;
            link.setAttribute("download", "photo.jpg");
            document.body.appendChild(link);
            link.click();
        })
    }
    return (
        <div id="home-container" className='childPics-container' >
            <div id="div-titles" className='option-container__div-titles' onClick={() => history.replace("/IslamApp/childs")}>
                <div style={{ backgroundColor: "#48956f" }} >
                    الأطفال
                </div>
            </div>
            <div className='option-container__main-div' >
                <img className='option-container__main-div__childImg__inner' src={childLogo} />
            </div>
            <div className='option-container__child_inner_tournments__side-div' style={{ animation: 'none', left: "calc(100% - (11vw + 2px))", zIndex: 2 }}>لوحات</div>

            <div className='option-container__child-pics' style={{ animation: 'none', top: "7vh" }}>
                <div className='option-container__child-pics__backgroundDiv' style={{ animation: 'none', width: "calc(96vw - 4px)", height: "80vh" }} >
                    <img src={child_pics} className="option-container__child-pics__backgroundPic"
                        style={{ animation: 'none', transform: "scale(1.5)", objectPosition: "0% 30%" }} />
                </div>
                <div style={{ height: "80vh", marginTop: "10vh", width: "96vw" }}>
                    <img src={child_pic3} className="childPicsPage__rightPicFaded" onClick={(elem) => !loading && handlePicTransition(elem)} />
                    <img src={child_pic2} className="childPicsPage__rightPic" onClick={(elem) => !loading && handlePicTransition(elem)} />
                    <img src={child_pic1} className="childPicsPage__mainPic" onClick={(elem) => !loading && handlePicTransition(elem)} />
                    <img src={child_pic3} className="childPicsPage__leftPic" onClick={(elem) => !loading && handlePicTransition(elem)} />
                    <img src={child_pic2} className="childPicsPage__leftPicFaded" onClick={(elem) => !loading && handlePicTransition(elem)} />
                </div>
            </div>
            {imgModalOpened &&
                <div className="modalBackdropStyle" >
                    <img src={currentImgURL} />
                    <div style={{ position: "relative" }}>
                        <div className='childCloseIcon' onClick={() => setImgModalOpened(false)} />
                        <div className='childInfoIcon' onClick={() => setDownloadChangeLangModal(true)}>
                            i
                        </div>
                    </div>
                </div>
            }
            {downloadChangeLangModal &&
                <div className="modalBackdropStyle" >
                    <div className='modalBackdropStyle__downloadChangeLang'>
                        <div className='modalBackdropStyle__downloadChangeLang__lang'>اختر اللغة</div>
                        <div className='modalBackdropStyle__downloadChangeLang__modalBackdropDivder' />
                        <div className='modalBackdropStyle__downloadChangeLang__download' onClick={() => download(currentImgURL)}>حمل الصورة</div>
                    </div>
                </div>
            }
            {/* fixed three buttons */}
            <div className='home-container__restart' style={{ animation: "none", left: 0 }} onClick={handleRestart}>
                إبدأ من جديد
            </div>
            <div className='home-container__goToHome' style={{ animation: 'none', bottom: 0 }} onClick={() => history.replace("/IslamApp/home")}>
                القائمة الرئيسية
            </div>
            <div className='home-container__goToHome' style={{ left: '33.8vw', animation: 'none', bottom: 0 }} onClick={() => setLanguageModal(true)}>
                اختر لغة
            </div>
            <LanguageModal isOpened={languageModalOpened} setLanguageModal={setLanguageModal} />
        </div >
    )
}