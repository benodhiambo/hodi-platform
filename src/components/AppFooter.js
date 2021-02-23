import React, { Component } from 'react';

class AppFooter extends Component {
    /**
     * controls navbar toggle
     */
    nav = {
        isOpen: false,
        setIsOpen: false,
        defaultPaths: ["/", "/ibs"]
    }

    render() {
        return (
            <>
                <div className="app-footer" >
                    <h3>{'\u00A9'}2021 - hodi platform</h3>
                </div>
            </>
        );
    }
}

export default AppFooter;
