import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Conversation.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Conversation({ currentUser, requestId, toId }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // const [currentConversation, setCurrentConversation] = useState({});

  //"/messages/requests/:requestId/users/:userId/with/:toId"
  useEffect(() => {
    // setCurrentConversation({requestId, userId: currentUser.id, toId})
    console.log('requestId :>> ', requestId);
    console.log('userId :>> ', currentUser.id);
    console.log('toId :>> ', toId);
    axios.get(`/api/requests/${requestId}/from/${currentUser.id}/to/${toId}/messages`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  },[]);

  // function getMessageList(currentConversation){
  //   console.log("Getting Current Messages ");
  //   if(currentConversation) {

  //   }

  // };

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
          newList.push(currentMessage);
          console.log(newList);
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
          messageList.map((message, index) => <p key={index}>{message}</p>)}
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
