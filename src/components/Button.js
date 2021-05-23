import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {
  return (
    <button className='btn'style = {buttonStyle(color)} onClick={onClick}>{text}</button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
  text: 'Button'
}

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string
}

const buttonStyle = (color) => {
  return {backgroundColor: color}
}

export default Button