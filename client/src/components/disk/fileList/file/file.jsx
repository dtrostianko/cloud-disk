import React from 'react';
import './file.css';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import filelogo from '../../../../assets/img/file.png';
import folder from '../../../../assets/img/folder.png';
import detele from '../../../../assets/img/delete.png';
import download from '../../../../assets/img/download.png';
import pdfIcon from '../../../../assets/img/pdf.png';
import archiveIcon from '../../../../assets/img/pdf.png';
import audioIcon from '../../../../assets/img/audio.png';
import imageIcon from '../../../../assets/img/image.png';
import videoIcon from '../../../../assets/img/video.png';
import docIcon from '../../../../assets/img/doc.png';
import exelIcon from '../../../../assets/img/xls.png';
import txtIcon from '../../../../assets/img/txt-file.png';
import zipIcon from '../../../../assets/img/zip.png';
import pptIcon from '../../../../assets/img/ppt.png';
import { downloadFile } from '../../../../actions/file';
import { deleteFile } from '../../../../actions/file';

const File = ({ file }) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const fileView = useSelector(state => state.files.view);
    function openDirHandler(file) {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }
    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if(fileView==='list'){
        return (
            <div className='file' onClick={file.type === 'dir' ? () => openDirHandler(file) : null}>
                <img src={file.type === 'dir' ? folder :(file.name.endsWith ('.JPG')|| file.name.endsWith('.png')|| file.name.endsWith('.svg') ? imageIcon  :(file.name.endsWith ('.pptx')|| file.name.endsWith('.ppt') ? pptIcon:(file.name.endsWith ('.zip')|| file.name.endsWith('.rar') ? zipIcon:(file.name.endsWith ('.txt') ? txtIcon :(file.name.endsWith ('.xlsm')|| file.name.endsWith('.xls') || file.name.endsWith('.xlsx')? exelIcon :(file.name.endsWith ('.docx') ? docIcon:(file.name.endsWith ('.mp4') ? videoIcon: file.type === 'archive' ? archiveIcon : (file.name.endsWith ('.pdf') ? pdfIcon : (file.name.endsWith('.mp3') || file.name.endsWith('.wav') || file.name.endsWith('.ogg') ? audioIcon : filelogo)))))))))} alt="" className="file-img-list" />
                <div className="file-name">{file.name}</div>
                <div className="file-data">{file.data ? file.data.slice(0, 10) : ''}</div>
                <div className="file-size">{file.size}</div>
                {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className="file-button download-button"><img src={download} alt="" className='download-button-img' /></button>}
                <button className="file-button delete-button"><img src={detele} alt="" className='delete-button-img' /></button>
            </div>
        );
    }  
    if(fileView==='tiles'){
        return (
            <div className='file-tiles' onClick={file.type === 'dir' ? () => openDirHandler(file) : null}>
                <img src={file.type === 'dir' ? folder :(file.name.endsWith ('.JPG')|| file.name.endsWith('.png')|| file.name.endsWith('.svg') ? imageIcon  :(file.name.endsWith ('.pptx')|| file.name.endsWith('.ppt') ? pptIcon:(file.name.endsWith ('.zip')|| file.name.endsWith('.rar')|| file.name.endsWith('.ZIP') ? zipIcon:(file.name.endsWith ('.txt') ? txtIcon :(file.name.endsWith ('.xlsm')|| file.name.endsWith('.xls') || file.name.endsWith('.xlsx')? exelIcon :(file.name.endsWith ('.docx') ? docIcon:(file.name.endsWith ('.mp4') ? videoIcon: file.type === 'archive' ? archiveIcon : (file.name.endsWith ('.pdf') ? pdfIcon : (file.name.endsWith('.mp3') || file.name.endsWith('.wav') || file.name.endsWith('.ogg') ? audioIcon : filelogo)))))))))} alt="" className="file-img-tiles" />
                <div className="file-name-tiles">{file.name}</div>
                <div className="file-tiles-buttons">
                    {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className="file-button-tiles download-button-tiles"><img src={download} alt="" className='download-button-img' /></button>}
                    <button onClick={(e)=>deleteClickHandler(e)} className="file-button-tiles delete-button-tiles"><img src={detele} alt="" className='delete-button-img' /></button>
                </div>
            </div>
        );
    }     
};

export default File;