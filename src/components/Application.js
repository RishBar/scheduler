import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "./DayList";
import Form from "components/Appointment/Form"
import Appointment from "components/Appointment/index"
import Button from "components/Button";
import getAppointmentsForDay from "../helpers/selectors"



const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//   id: 4,
//   time: "3pm",
//   interview: {
//     student: "Lydia Miller-Jones",
//     interviewer: {
//       id: 3,
//       name: "Mildred Nazir",
//       avatar: "https://i.imgur.com/T2WwVfS.png",
//     }
//   }
// }
// ];

export default function Application(props) {

  const [state, setState] = useState({day: "Monday", days: [], appointments: {}})
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`)
    ])
    .then((all) => {
      console.log(all[0]); // first
      console.log(all[1]); // second
      const [first, second] = all;

      console.log(first, second);
      setState(prev => ({ days: all[0].data, appointments: all[1].data}));
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  }, [])

  const appointmentList = getAppointmentsForDay(state, state.day).map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} /> )
  })
  

  return (
    <main className="layout">
      {/* < Button /> */}
      <section className="sidebar">
        <img 
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"/>
          <hr className="sidebar__seperator sidebar--centered"/>
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img 
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}