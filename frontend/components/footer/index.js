import React from 'react';

import './styles.css';

export default class Footer extends React.Component {

    render() {
        return (
            <div className="footer">
                © {new Date().getFullYear()}, Mak0FFD
            </div>
        );
    }
}
