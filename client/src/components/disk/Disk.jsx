import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, createDir, uploadFile } from "../../actions/file";
import FileList from "./fileList/FileList";
import "../disk/disk.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup";
import {
  setPopupDisplay,
  setCurrentDir,
  setFileView,
} from "../../reducers/fileReducer";
import backIcon from "../../assets/img/back-arrow.png";
import {searchFiles} from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const loader = useSelector((state) => state.files.loader);
  const dirStack = useSelector((state) => state.files.dirStack);
  const [dragEnter, setDragEnter] = useState(false);
  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)
  const [sort, setSort] = useState('date')

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  function showPopupHandler() {
    dispatch(setPopupDisplay("flex"));
  }

  function backClickHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  }

  function dragEnterHandler(event){
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }
  function dragLeaveHandler(event){
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

    function dropHandler(event){
        event.preventDefault()
        event.stopPropagation()
        let files =[...event.dataTransfer.files]
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false)
    }

    if(loader){
      return(
        <div className="loader">
          <div class="lds-default"></div>
        </div>
      )
    }
    function searchChangeHandler(e) {
      setSearchName(e.target.value)
      if (searchTimeout != false) {
          clearTimeout(searchTimeout)
      }
      dispatch(showLoader())
      if(e.target.value != '') {
          setSearchTimeout(setTimeout((value) => {
              dispatch(searchFiles(value));
          }, 500, e.target.value))
      } else {
          dispatch(getFiles(currentDir))
      }
  }
  return  (!dragEnter ?
    <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      <div className="main-search">
        <form className="main-search-row">
          <input
            value={searchName}
            onChange={e => searchChangeHandler(e)}
            className="search-txt"
            type="text"
            name=""
            placeholder="Поиск"
          />
        </form>
      </div>
      <div className="main-administration-btn">
        <button className="disk-back" onClick={() => backClickHandler()}>
          <img src={backIcon} alt="" className="back-icon" />
        </button>
       <select value={sort} onChange={(e)=>setSort(e.target.value)} className="disk-select">
        <option value="name">По имени</option>
        <option value="type">По типу</option>
        <option value="date">По дате</option>
       </select>
        <div className="main-createfolder">
          <button onClick={showPopupHandler} className="main-createfolder-btn">
            <FontAwesomeIcon icon={faFolderPlus} />
            Создать папку
          </button>
        </div>
        <div className="disk-upload">
          <label htmlFor="disk-upload-input" className="disk-upload-label">
            Загрузить файл
          </label>
          <input
            multiple={true}
            onChange={(event) => fileUploadHandler(event)}
            type="file"
            id="disk-upload-input"
            className="disk-upload-input"
          />
        </div>
        <button
          className="disk-tiles"
          onClick={() => dispatch(setFileView("tiles"))}
        />
        <button
          className="disk-list"
          onClick={() => dispatch(setFileView("list"))}
        />
      </div>
      <FileList />
      <Popup />
    </div>
    : 
    <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
        Перетащите файлы сюда
    </div>
  );
};

export default Disk;
