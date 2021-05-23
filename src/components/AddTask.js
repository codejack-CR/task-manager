import moment from 'moment'
import {useState} from 'react'

const AddTask = ({onAdd}) => {

  const [text, setText] = useState('')

  const [day, setDay] = useState(new Date())

  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    onAdd({text, day, reminder})

    setText('')
    setDay(new Date())
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task Description</label>
        <input type="text" required="true" onInvalid={(e) => e.target.setCustomValidity('Task Description cannot be empty')} onInput={(e) => e.target.setCustomValidity('')} placeholder="Add Task" value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Day &amp; Time</label>
        <input placeholder={moment(day).format('[On] ddd, DD MMM YYYY [at] HH:mm a [\[Click to change\]]')} type="text" onFocus={(e) => {e.target.type = 'datetime-local'; e.target.value=day}} onBlur={(e) => {e.target.type='text'; e.target.value=moment(day).format('[On] ddd, DD MMM YYYY [at] HH:mm a')}} onChange={(e) => setDay(e.target.value)}/>
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" 
        checked={reminder}
        value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>

      <input className="btn btn-block" type="submit" value="Save Task"/>
    </form>
  )
}

export default AddTask
