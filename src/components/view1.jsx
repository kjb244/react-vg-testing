import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Currency from './currency.jsx';
import Buttons from './buttons.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';




class View1 extends Component{
    state = {
        firstName: '',
        lastName: '',
        amount: '',
        errors: {
            firstName: {
                touched: false,
                errorText: []
            },
            lastName: {
                touched: false,
                errorText: []
            },
            amount: {
                touched: false,
                errorText: []
            }
        }

    };

    errorToTextMapping =  {
        required: 'field is required',
        noDigits: 'field must contain only alpha characters'
    }

    styles =  {
        error: {
            marginBottom: '0',
            marginTop: '4px',
            color: 'red'
        }
    }

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

    errorHtml = (key) =>{
        return (
            this.state.errors[key].errorText.length > 0 && this.state.errors[key].touched &&
                    <p style={this.styles.error}>{this.state.errors[key].errorText[0]}</p>
        )
    }

    firstNameGetErrors = (name, value) =>{
        const requiredCheck = (value || '').length < 1 ? true: false;
        const onlyAlphaCharsCheck = !/^[A-z]+$/.test(value || '');
        let errorText = [];
        if (requiredCheck) {
            errorText.push(this.errorToTextMapping.required);
        }
        if (onlyAlphaCharsCheck){
            errorText.push(this.errorToTextMapping.noDigits);
        }
        return errorText;
    }

    lastNameGetErrors = (name, value) =>{
        const requiredCheck = (value || '').length < 1 ? true: false;
        let errorText = [];
        if (requiredCheck) {
            errorText.push(this.errorToTextMapping.required);
        }
        return errorText;

    }

    amountGetErrors = (name, value) =>{
        const requiredCheck = (value || '').length < 1 ? true: false;
        let errorText = [];
        if (requiredCheck) {
            errorText.push(this.errorToTextMapping.required);
        }
        return errorText;
    }

    inputFieldChange = (e) =>{
        const {name, value} = e.target;

        let errorText = [];
        switch(name){
            case 'firstName':
                errorText = this.firstNameGetErrors(name, value);
            break;
            case 'lastName':
                errorText = this.lastNameGetErrors(name, value);
                break;
            case 'amount':
                errorText = this.amountGetErrors(name, value);
                break;
        }

        this.setState(prevState => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [name]: {
                    ...prevState.errors[name],
                    errorText: errorText
                }
            },
            [name]: value
        }))


    };

    blurEvent = (e) =>{
        const {name } = e.target;
        this.setState(prevState => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [name]: {
                    ...prevState.errors[name],
                    touched: true
                }
            }
        }));
        this.inputFieldChange(e);
    }

    shouldSubmit = () =>{
        const firstNameError = {
            errorText: this.firstNameGetErrors('firstName', this.state.firstName),
            touched: true
        }

        const lastNameError = {
            errorText: this.lastNameGetErrors('lastName', this.state.lastName),
            touched: true
        }

        const amountError = {
            errorText: this.amountGetErrors('amount', this.state.amount),
            touched: true
        }

        this.setState(prevState => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                firstName: firstNameError,
                lastName: lastNameError,
                amount: amountError,
            }
        }));
        return firstNameError.errorText.length === 0 &&
            lastNameError.errorText.length ===  0 &&
            amountError.errorText.length === 0;
    }



    render(){


        return(
            <section>
                <Form.Group>
                    <Row className={"mt-3"}>
                        <Col xs={12} sm={7}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name={"firstName"} placeholder=""
                                          value={this.state.firstName} onChange={this.inputFieldChange} onBlur={this.blurEvent} />
                            {this.errorHtml('firstName')}
                        </Col>

                    </Row>
                    <Row  className={"mt-3"}>
                        <Col xs={12} sm={7}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name={"lastName"} placeholder=""
                                          value={this.state.lastName} onChange={this.inputFieldChange} onBlur={this.blurEvent} />
                            {this.errorHtml('lastName')}
                        </Col>

                    </Row>
                    <Row  className={"mt-3"}>
                        <Col xs={12} sm={7}>
                            <Currency value={this.state.amount} name={"amount"}
                                      onChange={this.inputFieldChange} onBlur={this.blurEvent} />
                            {this.errorHtml('amount')}
                        </Col>

                    </Row>


                    <Buttons formData={{...this.state}} shouldSubmit={this.shouldSubmit}/>
                </Form.Group>

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
        clickForward: ()=> dispatch({type: 'SPLASH_MOVE_NEXT_ROUTE'})

    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps())(View1));

