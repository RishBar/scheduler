import React, { useState, Fragment } from "react";
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import useVisualMode from "../../hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
export default function Appointment(props) {

  function onConfirm() {
    transition(CONFIRM)
  };

  function deleteInterview() {
    if (mode === SHOW) { 
      onConfirm()
      }
      if (mode === CONFIRM) {
      transition(DELETING, true)
      props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
      }
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={deleteInterview}
      />
      )}
      {mode === CONFIRM && <Confirm message= "Are you sure you want to delete" onCancel={back} onConfirm={deleteInterview}/>}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === CREATE && <Form name="" interviewers={props.interviewers} interviewer="" onSave={save} onCancel={back} />}
    </article>
  );
}