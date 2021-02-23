import { Component } from 'react';
import './assets/css/App.css';
import AppFooter from './components/AppFooter';
import AppNav from './components/AppNav';

/**
 * main App Container
 * Provides a central point for
 * doing stuff that runs application-wide 
 * e.g. setting initial state of redux store
 */
class HodiContainer extends Component {
    render() {
        return (
            <>
                <AppNav />
                <AppFooter />
            </>
        );
    }
}

export default HodiContainer;
