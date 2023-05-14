import React from 'react';
import Svg from './resources/logo.svg';

function Logo({ ...props }) {
    return (<Svg style={{ stroke: 'currentColor' }} {...props} />);
}

export default Logo;
