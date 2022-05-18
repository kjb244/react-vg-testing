import './App.css';
import React, { Component } from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import View1 from './components/view1.jsx';
import View2 from './components/view2.jsx';
import Splash from './components/splash.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { connect } from 'react-redux';

class App extends Component {

    state = {
        masterClass: 'transition-master',
    };

    constructor(props) {
        super(props);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.forwardOrBackClicked !== this.props.forwardOrBackClicked) {
            let { masterClass } = {...this.state};
            masterClass = masterClass.replace('back','').replace('forward','').replace(/\s{2,}/,'');
            masterClass += ' ' + this.props.forwardOrBackClicked;
            this.setState({masterClass});
        }
    }

    masterClass = () =>{
        const newState = {...this.state};
        return newState.masterClass;
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col className={this.masterClass()}>
                        <BrowserRouter>
                            <Route render={ ({location}) => {
                                return (
                                    <TransitionGroup>
                                        <CSSTransition key={location.key} timeout={500} classNames="fade">
                                            <Switch location={location}>
                                                <Route  path='/splash' component={Splash}/>
                                                <Route  path='/view1' component={View1}/>
                                                <Route  path='/view2' component={View2}/>
                                            </Switch>
                                        </CSSTransition>
                                    </TransitionGroup>
                                )
                            }}/>
                        </BrowserRouter>
                    </Col>
                </Row>
            </Container>

        )
    }
}




const mapStateToProps =state => {
    return{
        forwardOrBackClicked: state.forwardOrBackClicked,
    }
};

export default connect(mapStateToProps)(App);;
