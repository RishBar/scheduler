import React, { useState } from "react";
import InterviewerList from "components/InterviewerList"
import Button from  "components/Button"

export default function Form(props) {

  // set name, interviewer, and error state for the form which creates or edits appointments
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // function to reset input field
  const reset = function() {
    setName("");
    setInterviewer(null)
  }
  const cancel = function() {
    props.onCancel()
    reset();
  }

  //function to validate input field and set error state accordingly
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Pick an interviewer");
      return;
    }
    setError("")
    props.onSave(name, interviewer);
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            onSubmit={event => event.preventDefault()}
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} 
        onChange={(event) => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={() => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}