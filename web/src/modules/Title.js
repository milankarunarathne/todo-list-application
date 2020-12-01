import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Title extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const isMobile = this.props.isMobile;
        return (
            <div className="navbar" style={{display: "flex", flexDirection: "row", width: '90%', marginLeft: '5%', backgroundColor: 'rgba(36, 63, 23, 1)', padding: 10, zIndex:1, position:'fixed' }}>
                <div className="title" style={{ color: 'white', fontSize: '60px', paddingLeft: '40%' }}>
                    <h1>My Todo List</h1>
                </div>
            </div>
        );
    }
}

Title.proTypes = {
    // isMobile: PropTypes.bool,
    style: PropTypes.object,
};


export default Title;