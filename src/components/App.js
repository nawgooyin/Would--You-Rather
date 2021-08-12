import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import { connect } from 'react-redux';
import Nav from './Nav';
import { handleInitialData } from '../actions/shared';
import Home from './Home';
import Login from './Login';
import NewQuestion from './NewQuestion';
import ChosenQuestion from './ChosenQuestion';
import LeaderBoard from './LeaderBoard';
import LoadingBar from 'react-redux-loading';
import Notfound  from './NotFound';
import ProtectedRoute from './ProtectedRoute';

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
                            : 
                                <main>
						            <Switch>
                                        <ProtectedRoute path='/home' component={Home} authedUser={this.props.authedUser}/>
                                        <Route path='/' exact component={Login}/>
                                        <ProtectedRoute path='/add' component={NewQuestion} authedUser={this.props.authedUser}/>
                                        <ProtectedRoute path='/leaderBoard' component={LeaderBoard} authedUser={this.props.authedUser}/>
                                        <ProtectedRoute path='/questions/:question_id' component={ChosenQuestion} authedUser={this.props.authedUser}/>
                                        <Route component={Notfound} />
                                    </Switch>
					            </main>}                            
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({ users, questions, authedUser }) {
    return {
        loading: !users && !questions ,
        authedUser
    }
}

export default connect(mapStateToProps)(App);
