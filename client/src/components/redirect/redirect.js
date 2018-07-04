import React from 'react';
import { Redirect } from 'react-router-dom';

function Redirects() {
    return(
        <Redirect to={this.props.path} />
    );
}

export default Redirects;