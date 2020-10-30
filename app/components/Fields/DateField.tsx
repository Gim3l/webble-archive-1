import { Box, InputField } from "bumbag"
import { FieldProps } from "formik"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const CardContainer = ({ children, className }) => (
  <Box className={className} background="#fff">
    {children}
  </Box>
)
const DateField = ({ field, form }: FieldProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  return (
    <>
      <DatePicker
        customInput={<InputField.Formik name={field.name} value={field.value} minWidth="40%" />}
        selected={selectedDate}
        minDate={new Date()}
        calendarContainer={CardContainer}
        onChange={(date) => {
          form.setFieldValue(field.name, date)
          form.validateForm()
          setSelectedDate(date)
        }}
        dateFormat="MMMM dd @ h:mm aa"
        showTimeSelect
      />
    </>
  )
}

export default DateField
