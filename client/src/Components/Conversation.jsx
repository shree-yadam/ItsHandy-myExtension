import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Conversation.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Conversation({ currentUser }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { requestId, toId } = useParams();
  //"/messages/requests/:requestId/users/:userId/with/:toId"
  useEffect(() => {
    axios.get(`/api/requests/${requestId}/messages`)
      .then(res => setMessageList(res.data))
      .catch(err => console.log(err));
  },[]);

  function handlemessageSubmit() {
    console.log(currentMessage);
    const time_sent = Date.now();
    axios
      .post(
        `/api/requests/${requestId}/from/${currentUser.id}/to/${toId}/messages`,
        { message: currentMessage, time_sent }
      )
      .then((res) => {
        setMessageList((prev) => {
          let newList = [...prev];
          const messageObj = {};
          //TBD: Better way to handle random id
          messageObj.id = Math.floor((Math.random() * 1000) + 1);
          messageObj.request_id = requestId;
          messageObj.from_id = currentUser.id;
          messageObj.to_id = toId;
          messageObj.time_sent = time_sent;
          messageObj.message = currentMessage;
          newList.push(messageObj);
          return newList;
        });
        setCurrentMessage("");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="conversation-container">
      <div>
        OLD Messages
        {messageList &&
          messageList.map(message => message.from_id === currentUser.id ? <p style={{color: "green"}} key={message.id}>{message.message}</p> : <p style={{color: "red"}} key={message.id}>{message.message}</p>)}
      </div>

      <Form.Group
        className="mb-3 conversation-input"
        controlId="conversationForm.ControlTextarea1"
      >
        <Form.Control
          as="textarea"
          rows={3}
          columns={11}
          placeholder="Send Message...."
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
      </Form.Group>
      <Button
        variant="success"
        size="lg"
        type="submit"
        onClick={() => handlemessageSubmit(requestId, currentUser.id, toId)}
      >
        Submit
      </Button>


    </div>
  );
}
