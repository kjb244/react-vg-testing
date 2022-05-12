import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';


class Buttons extends Component{
    state = {
        formData: {},
    };

    constructor(props){
        super(props);
    }

    showForward = () =>{
        const { currView, routeMapping } = this.props;
        if(!currView){
            return '';
        }

        if(!routeMapping[currView].next){
            return 'd-none';
        }
    };

    showBack = () => {
        const { currView, routeMapping } = this.props;
        if(!currView){
            return 'd-none';
        }

        if(!routeMapping[currView].prev){
            return 'd-none';
        }
    };


    render(){


        return(
            <React.Fragment>
                <Row className={'mt-3'}>
                    <Col xs={12}>
                        <Button className={this.showForward()} variant="primary"  onClick={this.props.clickForward}>Forward</Button>
                        <Button className={this.showBack()}  style={{marginLeft: '8px'}} variant="primary" onClick={this.props.clickBack}>Back</Button>
                    </Col>
                </Row>
            </React.Fragment>


        )
    }
};

const mapStateToProps =state => {
    return{
        routes: state.routes,
        currView: state.currView,
        routeMapping: state.routeMapping
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        clickForward: ()=> dispatch({type: 'CLICK_FORWARD', values: props.formData}),
        clickBack: ()=> dispatch({type: 'CLICK_BACK', values: props.formData}),


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);


