import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label:'Meat', type:'meat'},
    { label:'Cheese', type:'cheese'},
    { label:'Bacon', type:'bacon'},
    { label:'Salad', type:'salad'}
];



const buildControls = (props) => {
    return (
        <div className={classes.buildControls}>
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}£</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={()=>props.ingredientAdded(ctrl.type)}
                    removed={()=>props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabledItems[ctrl.type]}
                />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>ORDER</button>
        </div>
    );
}

export default buildControls;