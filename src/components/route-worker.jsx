import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';




class RouteWorker extends Component{
    state = {
    };

    constructor(props){
        super(props);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.routeChange !== this.props.routeChange) {
            this.props.history.push('/' + this.props.currView);

        }
    }



    render(){

        return(
            <React.Fragment></React.Fragment>

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

    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps())(RouteWorker));

