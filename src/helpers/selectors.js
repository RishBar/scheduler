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