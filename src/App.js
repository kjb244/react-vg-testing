import './App.css';
import React from 'react'
import { Switch, Route } from 'react-router-dom';
import View1 from './components/view1.jsx';
import View2 from './components/view2.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  return (
      <Container>
        <Row>
            <Col>
              <Switch>
                <Route  path='/view1' component={View1}/>
                <Route  path='/view2' component={View2}/>

              </Switch>
            </Col>
        </Row>
      </Container>

  );
}

export default App;
