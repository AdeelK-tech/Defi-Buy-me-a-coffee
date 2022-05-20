import React from "react";
import { Button, Container,Form, Input, Label,TextArea } from "semantic-ui-react";
import "./App.css";

function App() {
  return (
    <Container>
      <div style={{textAlign:'center',marginTop:'80px'}}>
      <h1>BUY ADEEL A CHAI....</h1>
      <div style={{marginTop:'70px'}}>
      <Form>
    <Form.Field>
      <label>NAME:</label>
      <Input style={{width:'200px'}}></Input>
      </Form.Field>
      <Form.Field>
      <TextArea placeholder='ADD MEMOS' style={{width:'500px'}}></TextArea>
      </Form.Field>
      <Button secondary content='send 0.01 ETH'></Button>
  </Form>
      </div>
      </div>
      
    </Container>
  );
}

export default App;
