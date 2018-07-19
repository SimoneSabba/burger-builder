import React, { Fragment } from 'react';
import classes from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let cssClasses = [classes.SideDrawer];

    if (props.open) {
        cssClasses.push(classes.Open);
    } else {
        cssClasses.push(classes.Close);
    }

    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.toggle}/>
            <div className={cssClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;