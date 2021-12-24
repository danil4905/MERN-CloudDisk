import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../../redux/actions/file";
import FileList from "./fileList/FileList";
import './disk.scss'
import Popup from "./Popup";
import { setPopupDisplay } from "../../redux/reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }


    return (
        <div className="disk">
            <div className="disk__btns">
                <button className="disk__back">Назад</button>
                <button className="disk__create" onClick={() => showPopupHandler()}>Создать папку</button>
            </div>
            <FileList />
            <Popup />
        </div>
    );
};

export default Disk;