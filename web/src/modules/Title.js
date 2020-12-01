import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaHome, FaFileExcel } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
// import Link from 'next/link';


class Title extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const isMobile = this.props.isMobile;
        return (
            <div className="navbar" style={{display: "flex", flexDirection: "row", backgroundColor: 'rgba(255, 33, 149, 1.0)', padding: 10, ...this.props.style}}>
                {/* <Link href="/">
                    <div style={{display: "flex", flex: 1, flexDirection: "row", margin: "0% 0% 0% 15%"}}>
                        <FaHome
                            color="#ffffff"
                            size="35px"
                            style={{ margin: '13px 15px' }}
                        />
                        {!isMobile && <div><h2>Home</h2></div>}
                    </div>
                </Link> */}
                {/* <Link href="/favourite">
                    <div style={{display: "flex", flex: 1, flexDirection: "row", margin: "0% 0% 0% 20%"}}>
                        <FaHeart
                            color="#ffffff"
                            size="35px"
                            style={{ margin: '18px 15px' }}
                        />
                        {!isMobile && <div><h2>Favorite</h2></div>}
                    </div>
                </Link> */}
                <style jsx>{`
                    h2 { 
                        color: #ffffff;
                    }

                    .navbar { 
                        position: relative;  
                        overflow: none; 
                        // z-index: 1;
                        font-family: sans-serif;
                    }
                `}</style>
            </div>
        );
    }
}

Title.proTypes = {
    // isMobile: PropTypes.bool,
    style: PropTypes.object,
};


export default Title;