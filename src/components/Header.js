import PropTypes from 'prop-types'

import {useLocation} from 'react-router-dom'

import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {

  const pageLocation = useLocation()

  return (
    <header className="header">
      <h1>{title}</h1>
      {pageLocation.pathname === '/' && <Button color ={showAdd ? '#FF3131' : '#097969'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Manager'
}

Header.propTypes = {
  title: PropTypes.string.isRequired, 
}

export default Header
