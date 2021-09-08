import React, { Fragment } from 'react';
import Navigation from '@/ui/Navigation';
import NavigationItem from '@/ui/NavigationItem';
import AboutMeScreen from './AboutMeScreen';

function IndexPage() {
    return (
        <Fragment>
            <AboutMeScreen />
            <Navigation>
                <NavigationItem title="/contact with me" to="/contacts" />
                <NavigationItem title="/my projects" to="/projects" />
            </Navigation>
        </Fragment>
    );
}

export default IndexPage;
