import React, { Component }                   from 'react';
import firebase                                       from 'firebase';
import { Provider }                                  from 'react-redux';
import { createStore, applyMiddleware }  from 'redux';
import Login                                          from './Login';
import Loader                                        from './Loader';
import Navigation                                   from './Navigation';
import reducers                                      from '../reducers/PeopleReducer';
import Thunk                                          from 'redux-thunk';

const store = createStore(reducers,
                                       window.__REDUX_DEVTOOLS_EXTENSION__ &&
                                       window.__REDUX_DEVTOOLS_EXTENSION__(),
                                       applyMiddleware(Thunk));

export default class App extends Component {
    state = { loggedIn: null};

    componentDidMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyCU2GTORuIj4uRLPZ5Umgo13ZgqOfvdYA0",
            authDomain: "contact-list-d7dd4.firebaseapp.com",
            databaseURL: "https://contact-list-d7dd4.firebaseio.com",
            projectId: "contact-list-d7dd4",
            storageBucket: "contact-list-d7dd4.appspot.com",
            messagingSenderId: "134975699472"
        });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({ loggedIn: true });
        } else {
            this.setState({ loggedIn: false});
        }
        });
    }

    renderInitialView() {
        switch (this.state.loggedIn) {
            case true:
                return <Navigation />;
            case false:
                return <Login />;
            default:
                return <Loader size="large" />;
            }
    }

    render() {
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        console.disableYellowBox = true;
        return (
            <Provider store={store}>
                { this.renderInitialView() }
            </Provider>
        );
    }
};
