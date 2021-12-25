import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../redux/actions/file";
import FileList from "./fileList/FileList";
import './disk.scss'
import Popup from "./Popup";
import { setPopupDisplay, setCurrentDir } from "../../redux/reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const [drugEnter, setDrugEnter] = useState(false);


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
    function drugEnterHendler(event) {
        event.preventDefault();
        event.stopPropagination();
        setDrugEnter(true);
    }
    function drugLeaveHendler(event) {
        event.preventDefault();
        event.stopPropagination();
        setDrugEnter(false);
    }
    function dropHendler(event) {
        event.preventDefault();
        event.stopPropagination();
        let files = [...event.dataTransfer.files];
        console.log(files)
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDrugEnter(false);
    }


    return (drugEnter ?
        <div className="disk" onDragOver={drugEnterHendler} onDragEnter={drugEnterHendler} onDragLeave={drugLeaveHendler}>
            <div className="disk__btns">
                <button className="disk__back" onClick={() => backClickHandler()}>Назад</button>
                <button className="disk__create" onClick={() => showPopupHandler()}>Создать папку</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input" />
                </div>
            </div>
            <FileList />
            <Popup />
        </div>
        :
        <div className='drop-area' onDrop={dropHendler} onDragOver={drugEnterHendler} onDragEnter={drugEnterHendler} onDragLeave={drugLeaveHendler}>
            Перетащите файлы сюда
        </div>
    );
};

export default Disk;