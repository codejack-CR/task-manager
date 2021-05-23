import moment from 'moment'
import {FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete, onToggle}) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
      <h3>{task.text} <FaTimes style={{color: 'lightcoral'}} onClick={() => onDelete(task.id)}/></h3>
      <p>{moment(task.day).format('[On] ddd, DD MMM YYYY [at] HH:mm a')}</p>
    </div>
  )
}

export default Task
