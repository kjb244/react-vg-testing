import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Reducer extends Component{
  constructor(props){
    super(props);
  }

  initialState = {
    routes: ['view1','view2','view3'],
    routeChange: new Date().getTime(),
    currView: null,
    forwardOrBackClicked: null,
    routeMapping: {
      'view1': {
        next: 'view2',
        prev: null,
        formData: {}
      },
      'view2': {
        next: null,
        prev: 'view1',
        formData: {}
      },
      'splash': {
        next: 'view1',
        prev: null,
        formData: {}
      }
    }
  };

  mapToStateAndNextView = (newState, formValues, forwardOrBack) =>{

    const currView = window.location.pathname.replace('/','');
    const routeMapping = newState.routeMapping[currView];
    routeMapping.formData = formValues;
    const next = forwardOrBack === 'forward' ? routeMapping.next : routeMapping.prev;
    newState.currView = next;
    newState.routeChange = new Date().getTime();
    newState.forwardOrBackClicked = forwardOrBack;


  };


  reducer = (state=this.initialState, action) => {
    const newState = {...state};

    switch(action.type){
      case 'CLICK_FORWARD':
        this.mapToStateAndNextView(newState, action.values, 'forward');
        break;
      case 'CLICK_BACK':
        this.mapToStateAndNextView(newState, action.values, 'back');
        break;
      case 'SPLASH_AJAX_COMPLETE':
        this.mapToStateAndNextView(newState, {}, 'forward');
        break;




    }

    return newState;
  };




}

const clazz = new Reducer();

export default clazz.reducer;