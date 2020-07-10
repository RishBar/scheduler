import React, { useState, Fragment } from "react";
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview? <Show interviewer={props.interview.interviewer} student={props.interview.student} onEdit={props.onEdit} onDelete={props.onDelete} />: <Empty onAdd={props.onAdd} />}
    </article>
  );
}
