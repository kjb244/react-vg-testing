import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, Row, Col } from 'react-bootstrap';

class Currency extends Component{
    state = {
        currency: '',
    };

    constructor(props){
        super(props);
        this.state.currency = this.maskInput(this.props.value ||'');
    }


    maskOnInput = (e) =>{
        const currencyHolder = this.maskInput(e.currentTarget.value);
        e.target.value = currencyHolder;
        this.props.onChange(e);
        this.setState({currency: currencyHolder});
    };

    onBlur = (e) =>{
        this.props.onBlur(e);
    }

    maskInput = (valu) =>{
        let currencyHolder = valu;
        currencyHolder = currencyHolder.replace(/[^0-9]/g,'');
        const rtn = currencyHolder.split('').reverse().map((e,i) =>{
            if(i >0 && i %3 === 0){
                return e + ',';
            }
            return e;
        }).reverse().join('');

        if(rtn.length){
            return '$' + rtn;
        } else{
            return rtn;
        }
    };



    render(){


        return(
            <React.Fragment>
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text"
                              name={this.props.name}
                              placeholder=""
                              value={this.state.currency}
                              onInput={this.maskOnInput}
                              onBlur={this.onBlur}
                                />
            </React.Fragment>


        )
    }
};


export default Currency;

