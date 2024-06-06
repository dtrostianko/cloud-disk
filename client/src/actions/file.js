import axios from 'axios'
import {setFiles, addFile, deleteFileAction} from "../reducers/fileReducer";
import { hideLoader, showLoader } from '../reducers/appReducer';

export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            let url = `http://localhost:5000/api/files`
            if (dirId) {
                url = `http://localhost:5000/api/files?parent=${dirId}`
            }
            if (sort) {
                url = `http://localhost:5000/api/files?sort=${sort}`
            }
            if (dirId && sort) {
                url = `http://localhost:5000/api/files?parent=${dirId}&sort=${sort}`
            }
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e.response.data.message)
        } finally{
            dispatch(hideLoader())
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/files`,{
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId);
            }

            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target && progressEvent.target.getResponseHeader && (progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length'));
                    
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength);
                        console.log('Upload Progress:', progress + '%');
                    }
                }
            });

            if (response && response.data) {
                dispatch(addFile(response.data));
            } else {
                throw new Error('Invalid server response');
            }
        } catch (e) {
            alert(e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Error uploading file');
        }
    };
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}

export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/files/search?search=${search}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e?.response?.data?.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}