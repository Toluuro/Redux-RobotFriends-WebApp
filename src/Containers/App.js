import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
import '../Containers/App.css';

import {setSearchField, requestRobots} from '../actions'


// Tell me what piece of state i need to listen to.
const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        IsPending: state.requestRobots.IsPending,
        error:state.requestRobots.error
    }
}

// Tell me what props i should listen to that are actions that need to get dispatched.
const mapDispatchToProps = (dispatch) => {
    return {
        UserRobotchange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () =>dispatch(requestRobots())
    }
}

// START.
class App extends Component {
    
    componentDidMount() {
    this.props.onRequestRobots()
        
    };
    

    render() {   
        const { searchField, UserRobotchange, robots, IsPending } = this.props;
        const filterRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return IsPending ?
             <h1>LOADING...</h1> :
             (
                <div className='tc'>
                    <h1 className='f1'>Robot Friends</h1>
                    <SearchBox Robotchange = {UserRobotchange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots = {filterRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }

 
export default connect(mapStateToProps, mapDispatchToProps)(App);
// END.