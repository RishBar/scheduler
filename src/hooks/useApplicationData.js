import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const spotsDecrease = () => {
      const daysArr = [...state.days]
      daysArr.map(day => {
        for(let appointment of day.appointments) {
          if (appointment === id) {
            day.spots--;
          }
        }
        
      })
      return daysArr;
    }
    return Promise.all([
      axios.put(`/api/appointments/${id}`, appointment)
    ])
    .then((res) => {
      spotsDecrease();
      setState({...state, appointments})
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      "interview": null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const spotsIncrease = () => {
      const daysArr = [...state.days]
      daysArr.map(day => {
        for(let appointment of day.appointments) {
          if (appointment === id) {
            day.spots++;
          }
        }
        
      })
      return daysArr;
    } 
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      spotsIncrease();
      setState({...state, appointment})
    })
  }

  const [state, setState] = useState({day: "Monday", days: [], appointments: {}, interviewers: {}})
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
    .then((all) => {
      const [first, second, third] = all;

      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    .catch((error) => {
      console.log(error);
      console.log(error);
      console.log(error);
    });
  }, [])
  
  return {state, setDay, bookInterview, cancelInterview}
};