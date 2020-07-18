import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  // set state
  const [state, setState] = useState({day: "Monday", days: [], appointments: {}, interviewers: {}})
  const setDay = day => setState({ ...state, day });

  // get data from API server and set state with data
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    .catch((error) => {
      console.log(error);
      console.log(error);
      console.log(error);
    });
  }, [])

  // define functions which will set the state of the main application component if appointments are booked, cancelled, or edited and will also update the API server with the new data
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
      // if id of appointment exists in day.appointment array, then decrease day.spots by 1
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

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Promise.all([
      axios.put(`/api/appointments/${id}`, appointment)
    ])
    .then((res) => {
      setState({...state, appointments})
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      "interview": null
    };
    const spotsIncrease = () => {
      const daysArr = [...state.days]
      // if id of appointment exists in day.appointment array, then increase day.spots by 1
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
  
  return {state, setDay, bookInterview, editInterview, cancelInterview}
};