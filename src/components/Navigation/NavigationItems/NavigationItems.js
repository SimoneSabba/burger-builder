import React from 'react';
import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact> Home </NavigationItem>
        <NavigationItem link="/auth" exact> Login </NavigationItem>
        <NavigationItem link="/orders"> Orders </NavigationItem>
    </ul>
);

export default navigationItems;