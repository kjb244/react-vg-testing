import './App.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
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
              <Routes>
                <Route  path='/view1' element={<View1/>}/>
                <Route  path='/view2' element={<View2/>}/>

              </Routes>
            </Col>
        </Row>
      </Container>

  );
}

export default App;
