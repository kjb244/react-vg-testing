import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, Row, Col } from 'react-bootstrap';
import Currency from './currency.jsx';
import Buttons from './buttons.jsx';
import { connect } from 'react-redux';
import { Navigate, Route } from 'react-router-dom'





class View1 extends Component{
    state = {
        firstName: '',
        lastName: '',
        amount: '',

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
        if (prevProps.currView !== this.props.currView) {
            console.log(this.props);
             <Route path="*" element={<Navigate to ="/products" />}/>





        }
    }

    changeFirstName = (e) =>{
        this.setState({firstName: e.target.value});
    };

    changeLastName = (e) =>{
        this.setState({lastName: e.target.value});
    };

    changeAmount = (currency) =>{
        this.setState({amount: currency});
    };



    render(){


        return(
            <section>
                <Form.Group>
                    <Row className={"mt-3"}>
                        <Col xs={12} sm={7}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="" value={this.state.firstName} onChange={this.changeFirstName} />
                        </Col>

                    </Row>
                    <Row  className={"mt-3"}>
                        <Col xs={12} sm={7}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="" value={this.state.lastName} onChange={this.changeLastName} />

                        </Col>

                    </Row>
                    <Row  className={"mt-3"}>
                        <Col xs={12} sm={7}>
                            <Currency value={this.state.amount} onChange={this.changeAmount}/>
                        </Col>

                    </Row>


                    <Buttons formData={{...this.state}}/>
                </Form.Group>

            </section>


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


export default connect(mapStateToProps)(View1);
