import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, createDir, uploadFile } from "../../actions/file";
import FileList from "./fileList/FileList";
import '../disk/disk.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFile, faClock, faImage, faFileAlt, faFileAudio, faFileVideo, faFilePdf, faFilePowerpoint, faTable, faFolder, faQuestionCircle, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup";
import { setPopupDisplay, setCurrentDir, setFileView } from "../../reducers/fileReducer";
import backIcon from "../../assets/img/back-arrow.png"

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    return (
        <div className="disk"> 
            <div className="main-search">
                <form className="main-search-row">
                 <button className="search-btn"><i className="fasearch"><FontAwesomeIcon icon={faMagnifyingGlass} /></i></button>
                <input className="search-txt" type="text" name="" placeholder="Поиск"/>
            </form>
        </div>
            <div className="main-administration-btn">
                <button className="disk-back" onClick={()=>backClickHandler()}>
                    <img src={backIcon} alt="" className="back-icon"/>    
                </button>
                <div className="main-dropdown-type">
                    <button className="dropdown-type-btn"><FontAwesomeIcon icon={faFile} /> Тип</button>
                    <div className="dropdown-type-content">
                        <a href="#"><FontAwesomeIcon icon={faClock} className="content-all"/>Все типы</a>
                        <a href="#"><FontAwesomeIcon icon={faImage} className="content-img"/>Изображение</a>
                        <a href="#"><FontAwesomeIcon icon={faFileAlt} className="content-document"/>Документы</a>
                        <a href="#"><FontAwesomeIcon icon={faFileAudio} className="content-audio"/>Аудио</a>
                        <a href="#"><FontAwesomeIcon icon={faFileVideo} className="content-video"/>Видео</a>
                        <a href="#"><FontAwesomeIcon icon={faFilePdf} className="content-pdf"/>PDF</a>
                        <a href="#"><FontAwesomeIcon icon={faFilePowerpoint} className="content-presentation"/>Презентации</a>
                        <a href="#"><FontAwesomeIcon icon={faTable} className="content-table"/>Таблицы</a>
                        <a href="#"><FontAwesomeIcon icon={faFolder} className="content-folder"/>Папки</a>
                        <a href="#"><FontAwesomeIcon icon={faQuestionCircle} className="content-other"/>Другие</a>
                    </div>
                </div>
                <div className="main-dropdown-lastchanges">
                    <button className="dropdown-lastchanges-btn">Последнее изменение</button>
                    <div className="dropdown-lastchanges-content">
                        <a href="#">Сегодня</a>
                        <a href="#">Последние 7 дней</a>
                        <a href="#">Последние 30 дней</a>
                        <a href="#">Текущий год</a>
                        <a href="#">Последний год</a>
                        <a href="#">Позже</a>
                    </div>
                </div>
                <div className="main-dropdown-dateadded">
                    <button className="dropdown-dateadded-btn">Дата добавления</button>
                    <div className="dropdown-dateadded-content">
                        <a href="#">Сегодня</a>
                        <a href="#">Последние 7 дней</a>
                        <a href="#">Последние 30 дней</a>
                        <a href="#">Текущий год</a>
                        <a href="#">Последний год</a>
                        <a href="#">Позже</a>
                    </div>
                </div>
                <div className="main-createfolder">
                    <button onClick={showPopupHandler} className="main-createfolder-btn"><FontAwesomeIcon icon={faFolderPlus} />Создать папку</button>
                </div>
                <div className="disk-upload">
                    <label htmlFor="disk-upload-input" className="disk-upload-label">Загрузить файл</label>
                    <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id="disk-upload-input" className="disk-upload-input"/>
                </div>
                <button className="disk-tiles" onClick={()=>dispatch(setFileView('tiles'))}/>
                <button className="disk-list" onClick={()=>dispatch(setFileView('list'))}/>
            </div>  
            <FileList/>  
            <Popup/>
        </div>
        
    );
};

export default Disk;