import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, Row, Col, Modal, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import fakeAjax from '../utilities/utils.js';




class Splash extends Component{
    state = {
        showModal: false,
    };

    constructor(props){
        super(props);
        const { currView, routeMapping } = props;

        if(currView){
            const formData = routeMapping[currView].formData;
            Object.keys(this.state).forEach((e) =>{
                if(formData[e]){
                    this.state[e] = formData[e];
                }
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.routeChange !== this.props.routeChange) {
            this.props.history.push(this.props.currView);

        }
    }

    componentDidMount(){
        this.setState({showModal: true});
        fakeAjax().then((payload) =>{
            this.props.splashAjaxComplete();
            this.setState({showModal: false});

        })
    }



    render(){


        return(
            <section>
                <Modal show={this.state.showModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Loading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{display: 'flex', justifyContent: 'center'}}>
                        <Spinner animation="border" variant="primary" />
                    </Modal.Body>

                </Modal>

            </section>


        )
    }
};

const mapStateToProps =state => {
    return{
        routes: state.routes,
        routeChange: state.routeChange,
        currView: state.currView,
        routeMapping: state.routeMapping
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        splashAjaxComplete: ()=> dispatch({type: 'SPLASH_AJAX_COMPLETE'}),


    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Splash));

