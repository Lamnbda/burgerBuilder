import React from 'react';

import classes from './Backdrop.css';
const backdrop = (props) => (
    props.show ? <div className = {classes.Backdrop} onClick = {props.clicked}></div> : null //When the non opaq background is clicked, it removes the dark and the order menu.
);

export default backdrop;