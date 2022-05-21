import { ethers } from "ethers";
import { React, useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Icon,
  Input,
  TextArea,
  Card
} from "semantic-ui-react";
import "./App.css";
import buyMeACoffee from "./buymeAcoffee";
function App() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);

  console.log(buyMeACoffee);

  const isWalletConnected = async () => {
    try {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setAddress(accounts[0]);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };
  const buyCoffee = async () => {
    try {
      const tip = ethers.utils.parseEther("0.01");
      const coffeeTxn = await buyMeACoffee.BuyACoffee(name, message, {
        value: tip,
      });
      await coffeeTxn.wait();
      console.log("mined: " + coffeeTxn.hash);
    } catch (e) {
      console.log(e);
    }
  };
  const buyLargeCoffee = async () => {
    try {
      const tip = ethers.utils.parseEther("0.03");
      const coffeeTxn = await buyMeACoffee.BuyACoffee(name, message, {
        value: tip,
      });
      await coffeeTxn.wait();
      console.log("mined: " + coffeeTxn.hash);
    } catch (e) {
      console.log(e);
    }
  };
  const getMemos = async () => {
    try {
      const memos = await buyMeACoffee.getMemos();
      console.log(memos);
      const memoItems = await Promise.all(
        memos.map((memo) => {
          const item = {
            header: memo.name,
            meta: String(memo.timestamp),
            description: memo.message,
           
          };
          return item;
        })
      );
      setMemos(memoItems);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMemos();
  }, [memos]);
  console.log(memos);
  return (
    <Container>
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>
          BUY ADEEL A CHAI <Icon name="coffee"></Icon>
        </h1>
        <div style={{ marginTop: "70px" }}>
          {!address ? (
            <div>
              <Button
                secondary
                content="Connect Wallet"
                onClick={isWalletConnected}
                loading={loading}
              ></Button>
              <footer>
                <div style={{ textAlign: "center", marginTop: "400px" }}>
                  <h3>
                    {" "}
                    Created by{" "}
                    <a
                      href="https://twitter.com/_RuntimeTerror"
                      style={{ color: "beige" }}
                    >
                      Muhammad Adeel <Icon name="copyright"></Icon>
                    </a>
                  </h3>
                </div>
              </footer>
            </div>
          ) : (
            <div>
            <Form>
              <Form.Field>
                <label>NAME:</label>
                <Input
                  style={{ width: "200px" }}
                  value={name}
                  onChange={nameChangeHandler}
                ></Input>
              </Form.Field>
              <Form.Field>
                <TextArea
                  placeholder="ADD MEMOS"
                  style={{ width: "500px" }}
                  value={message}
                  onChange={messageChangeHandler}
                ></TextArea>
              </Form.Field>
              <Button
                secondary
                content="send 0.01 ETH"
                onClick={buyCoffee}
              ></Button>
              <Button
                secondary
                content="send 0.03 ETH"
                onClick={buyLargeCoffee}
              ></Button>
            </Form>
            <h2>Memos Recieved :</h2>
            <div style={{marginTop:'50px'}}>
            <Card.Group items={memos}></Card.Group>
            </div>
            </div>
          )}
        </div>
      </div>
      
    </Container>
  );
}

export default App;
