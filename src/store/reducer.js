import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Reducer extends Component{
  constructor(props){
    super(props);
  }

  initialState = {
    routes: ['view1','view2','view3'],
    currView: null,
    routeMapping: {
      'view1': {
        next: 'view2',
        prev: null,
        formData: {}
      },
      'view2': {
        next: 'view3',
        prev: 'view1',
        formData: {}
      },
      'view3': {
        next: null,
        prev: 'view2',
        formData: {}
      }
    }
  };

  mapToStateAndNextView = (newState, formValues, forwardOrBack) =>{
    if (!newState.currView){
      newState.currView = 'view1';
    }
    const currView = newState.currView;
    const routeMapping = newState.routeMapping[currView];
    routeMapping.formData = formValues;
    const next = forwardOrBack === 'forward' ? routeMapping.next : routeMapping.prev;
    newState.currView = next;




  }


  reducer = (state=this.initialState, action) => {
    const newState = {...state};

    switch(action.type){
      case 'CLICK_FORWARD':
        this.mapToStateAndNextView(newState, action.values, 'forward');
        break;
      case 'CLICK_BACK':
        this.mapToStateAndNextView(newState, action.values, 'back');
        break;


    }

    return newState;
  };




}

const clazz = new Reducer();

export default clazz.reducer;