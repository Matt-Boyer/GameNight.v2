import React, { useRef, useState, useContext } from 'react';
import './checkoutpopup.css'

function CheckoutPopUp({ setCheckedOut }) {
    const modalRef = useRef();

    return (
        <div id="modalcheckout" onClick={() => {
            setCheckedOut(false)
        }}>
            <div id="modal-backgroundcheckout" onClick={() => {
                setCheckedOut(false)
            }} />
            <div id="modal-contentcheckout">
                <div id='textmodalaftercheckout'>
                    <div >Thank you for your purchase!</div>
                    <div >Click anywhere to continue.</div>
                </div>
            </div>
        </div>
        //   modalRef.current
    )
}

export default CheckoutPopUp
