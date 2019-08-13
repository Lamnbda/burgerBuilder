import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className = {classes.BuildControls}> {/* //This is where the build control will go.  */}
    {controls.map(ctrl => (
        <BuildControl key={ctrl.label} label = {ctrl.label}/>
    ))}
    </div> //We are going to have a couple of build controls and we are going to outsource it. It us also a reusable UI unit.
)

export default buildControls;