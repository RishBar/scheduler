export default function getAppointmentsForDay(state, day) {
  const getAppointmentId = () => {
    for (const days of state.days) {
      if (days.name === day) {
        return days.appointments
      }
    }
    return []
  }
  const appointmentsId = getAppointmentId()
  const appointments = []
  for (const id of appointmentsId) {
    appointments.push(state.appointments[`${id}`])
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const id = interview.interviewer;
  const interviewer = state.interviewers[`${id}`]
  return {student: interview.student, interviewer}
}

export function getInterviewersForDay(state, day) {
  const getInterviewerId = () => {
    for (const days of state.days) {
      if (days.name === day) {
        return days.interviewers
      }
    }
    return []
  }
  const interviewersId = getInterviewerId()
  const interviewers = []
  for (const id of interviewersId) {
    interviewers.push(state.interviewers[`${id}`])
  }
  return interviewers;
}

