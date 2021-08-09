import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'; 
import { connect } from 'react-redux';
import Nav from './Nav';
import { handleInitialData } from '../actions/shared';
import Home from './Home';
import Login from './Login';
import NewQuestion from './NewQuestion';
import LoadingBar from 'react-redux-loading';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <div className='container'>
                        <Nav />
                        {this.props.loading 
                            ? null 
                            : <div> 
                                <Route path='/' exact component={Home}/>
                                <Route path='/login' component={Login}/>
                                <Route path='/new' component={NewQuestion}/>
                            </div>}
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App);
