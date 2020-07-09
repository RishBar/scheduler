import React from "react";
import classnames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    );
  });
  // const interviewerList = props.interviewers.map(interviewer => {
  //   return <section className="interviewer">
  //             <h4 className="interviewers__header text--light">Interviewer</h4>
  //             <ul>
  //               <InterviewerListItem 
  //                 name={interviewer.name}
  //                 avatar={interviewer.avatar}
  //                 selected={props.interviewer === interviewer.id}
  //                 setInterviewer={event => {props.setInterviewer(interviewer.id)}}
  //                 />
  //             </ul>
  //          </section>
  // })
  return <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{interviewers}</ul>
          </section>;
};