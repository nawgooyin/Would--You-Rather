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
                                        <Route path='/home' component={Home}/>
                                        <Route path='/' exact component={Login}/>
                                        <Route path='/add' component={NewQuestion} />
                                        <Route path='/leaderBoard' component={LeaderBoard} />
                                        <Route path='/questions/:question_id' component={ChosenQuestion}/>
                                        <Route component={Notfound} />
                                    </Switch>
					            </main>}                            
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({ users, questions }) {
    return {
        loading: !users && !questions 
    }
}

export default connect(mapStateToProps)(App);
