import PropTypes from 'prop-types'

export const Button = (props) => {
  return (
    <button className='category' value={props.value} onClick={props.changeDeck}>{props.name}</button>
  )
}

Button.defaultProps = {
  name: "Button",
    changeDeck: () => {},
    value: -1
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
    changeDeck: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
}
