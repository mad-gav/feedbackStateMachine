import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { useMachine } from "@xstate/react";
import { feedbackMachine } from "./machine";
import FeedbackInitialBar from "./FeedbackPanel";
import FeedbackForm from "./FeedbackForm";

function App() {
  const handleClick = feedback => {
    console.log(feedback);
    send({
      type: "SUBMIT",
      value: feedback
    });
  };

  const [current, send] = useMachine(feedbackMachine);
  console.log(current.value);
  return (
    <div className="App">
      <button onClick={() => send("RESET")}>Reset state</button>
      {current.matches("idle") && (
        <FeedbackInitialBar handleClick={handleClick} />
      )}
      {current.matches("submitting") && <div> Submitting form... </div>}
      {current.matches("formpanelopened") && <FeedbackForm />}
      {current.matches("initialsuccess") && (
        <div>Thankyou for your feedback</div>
      )}
      {current.matches("initialerror") && <div> initial error</div>}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
