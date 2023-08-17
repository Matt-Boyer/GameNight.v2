import React, { useRef, useState, useContext } from 'react';
import howtogif from '../../Images/gamenightgif.gif'
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
                <div id='textmodalaftercheckouthowtousegamenight'>
                    <div >Click on the boxes (i.e. Category, Method) to filter and choose as many options.</div>
                    <div id='divholdinggifforhowtousegamenight'>
                        <img id='gifforhowtousegamenight' src={howtogif} alt="gif showing how to use gamenight filters" />
                    </div>
                    <div >Click anywhere to continue.</div>
                </div>
            </div>
        </div>
        //   modalRef.current
    )
}

export default Confused
