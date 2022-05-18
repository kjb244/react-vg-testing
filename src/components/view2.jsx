import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import Buttons from './buttons.jsx';
import { connect } from 'react-redux';


class View2 extends Component{
    state = {
        friend: '',
        friends: [],
    };

    constructor(props) {
        super(props);

        const {currView, routeMapping} = props;

        if (currView) {
            const formData = routeMapping[currView].formData;
            Object.keys(this.state).forEach((e) => {
                if (formData[e]) {
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


    changeFriend = (e) =>{
        this.setState({friend: e.target.value});
    };

    addFriend = () =>{
        const friends = [...this.state.friends, this.state.friend];
        this.setState({friends: friends});
        this.setState({friend: ''});
    };

    closeAlert = (index) =>{
        const friends = this.state.friends.filter((e,i) => i !== index);
        this.setState({friends: friends});
    };

    returnAlert = (e,i) => {
        return (
            <Alert key={i} variant="success" onClose={() => {this.closeAlert(i)}}  dismissible>
                <Alert.Heading>{e}</Alert.Heading>
            </Alert>
        );
    };


    render(){


        return(
            <section>
                <Form.Group>
                    <Row className={"mt-3"}>
                        <Col xs={12} sm={7}>
                            <div style={{display: 'flex'}} >
                                <Form.Control type="text" placeholder="Add a friend" value={this.state.friend} onChange={this.changeFriend} />
                                <Button style={{marginLeft: '8px'}} variant="primary" onClick={this.addFriend}>Add</Button>
                            </div>
                        </Col>
                    </Row>

                    <Row className={"mt-3"}>
                        <Col xs={12} sm={7}>
                            {this.state.friends.map((e,i) =>{
                                return this.returnAlert(e,i);
                            })}
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
        routeChange: state.routeChange,
        currView: state.currView,
        routeMapping: state.routeMapping
    }
};

export default connect(mapStateToProps)(View2);
