import React, { useRef, useState, useContext } from 'react';
import './confused.css'

function Confused({ setConfusedShown }) {
    const modalRef = useRef();

    return (
        <div id="modalcheckout" onClick={() => {
            setConfusedShown(false)
        }}>
            <div id="modal-backgroundcheckout" onClick={() => {
                setConfusedShown(false)
            }} />
            <div id="modal-contentcheckout">
                <div id='textmodalaftercheckout'>
                    <div >Click on the boxes (i.e. Category, Method) to filter and choose as many options.</div>
                    <div >Click anywhere to continue.</div>
                </div>
            </div>
        </div>
        //   modalRef.current
    )
}

export default Confused
