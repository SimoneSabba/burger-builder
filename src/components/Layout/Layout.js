import React, { Fragment, Component } from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layour extends Component {

    state = {
        showSideDrawer: false
    };

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render () {
        return (
            <Fragment>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} toggle={this.toggleSideDrawerHandler} />
                <main className={classes.content}> { this.props.children }</main>
            </Fragment>
        );
    }
}

export default Layour;