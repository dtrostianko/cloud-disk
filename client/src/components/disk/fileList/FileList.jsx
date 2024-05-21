import React from "react";
import { useSelector } from "react-redux";
import './fileList.css';
import File from "./file/file";

const FileList = () => {
    const files = useSelector(state => state.files.files);
    const fileView = useSelector(state => state.files.view);
    if (!files || !Array.isArray(files)) {
        return <p>No files found</p>;
    }

    if(fileView ==='tiles'){
        return(
        <div className="filetiles">
                {files.length > 0 ? files.map(file => (
                    <File key={file.id || file.name} file={file} />
                )) : <p></p>}
            </div>
        )
    }

    if(fileView==='list'){
        return (
            <div className="filelist">
                <div className="filelist-header">
                    <div className="filelist-name">Название</div>
                    <div className="filelist-data">Дата</div>
                    <div className="filelist-size">Размер</div>
                </div>
                {files.length > 0 ? files.map(file => (
                    <File key={file.id || file.name} file={file} />
                )) : <p></p>}
            </div>
        );
    }
    
}

export default FileList;