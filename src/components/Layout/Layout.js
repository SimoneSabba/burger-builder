import React, { Fragment } from 'react';

import classes from './Layout.css';

const layout = (props) => (
    <Fragment>
        <div> Toolbar and other components</div>
        <main className={classes.content}> { props.children }</main>
    </Fragment>
);

export default layout;