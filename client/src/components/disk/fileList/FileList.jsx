import React from 'react';
import './fileList.scss'
import { useSelector } from "react-redux";
import File from "./file/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const FileList = () => {

    const files = useSelector(state => state.files.files).map(file => <File key={file.id} file={file} />)

    return (
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Название</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
            <TransitionGroup>
                {files.map(file =>
                    <CSSTransition
                        key={file._id}
                        timeout={500}
                        classNames={'file'}
                        exit={false}>
                        <File file={file}/>
                    </CSSTransition>)
                }
            </TransitionGroup>
        </div>
    );
};

export default FileList;