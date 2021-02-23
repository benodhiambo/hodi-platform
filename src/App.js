import { Component } from 'react';
import { Provider } from 'react-redux';
import './assets/css/App.css';
import HodiContainer from './HodiContainer';
import { appStore } from './redux/appStore';

class App extends Component {
    render() {
        return (
            <Provider store={appStore}>
                <HodiContainer />
            </Provider>
        );
    }
}

export default App;
