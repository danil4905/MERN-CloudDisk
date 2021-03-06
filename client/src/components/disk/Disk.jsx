import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../redux/actions/file";
import FileList from "./fileList/FileList";
import './disk.scss'
import Popup from "./Popup";
import {setPopupDisplay, setFileView, setCurrentDir} from "../../redux/reducers/fileReducer";
import Uploader from "./uploader/Uploader";


const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const user = useSelector(state => state.user.currentUser)
    const loader = useSelector(state => state.app.loader)
    const [drugEnter, setDrugEnter] = useState(false);
    const [sort, setSort] = useState('type')


    useEffect(() => {
        dispatch(getFiles(currentDir,sort,user))
        console.log('GETFILES')
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
        event.stopPropagation();
        setDrugEnter(true);
    }

    function drugLeaveHendler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDrugEnter(false);
    }

    function dropHendler(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        console.log(files)
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDrugEnter(false);
    }

    if (loader) {
        return (
            <div className="loader">
                <div className="lds-dual-ring"/>
            </div>
        )
    }

    return (!drugEnter ?
            <div className="disk" onDragOver={drugEnterHendler} onDragEnter={drugEnterHendler}
                 onDragLeave={drugLeaveHendler}>
                <div className="disk__btns">
                    <div className='disk__controlls'>
                        <button className="disk__back" onClick={() => backClickHandler()}>??????????</button>
                        <button className="disk__create" onClick={() => showPopupHandler()}>?????????????? ??????????</button>
                        <div className="disk__upload">
                            <label htmlFor="disk__upload-input" className="disk__upload-label">?????????????????? ????????</label>
                            <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file"
                                   id="disk__upload-input" className="disk__upload-input"/>
                        </div>
                    </div>
                    <div className='disk__views'>
                        <select value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className='disk__select'>
                            <option value="name">???? ??????????</option>
                            <option value="type">???? ????????</option>
                            <option value="date">???? ????????</option>
                        </select>
                        <button className="disk__plate" onClick={() => dispatch(setFileView('plate'))}/>
                        <button className="disk__list" onClick={() => dispatch(setFileView('list'))}/>
                    </div>
                </div>
                <FileList/>
                <Popup/>
                <Uploader/>
            </div>
            :
            <div className='drop-area' onDrop={dropHendler} onDragOver={drugEnterHendler} onDragEnter={drugEnterHendler}
                 onDragLeave={drugLeaveHendler}>
                ???????????????????? ?????????? ????????
            </div>
    );
};

export default Disk;
