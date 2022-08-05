import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {

    const onClick = () => {
        console.log('>>>>');
    }

  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button onClick={onClick} color="green" text="Add"/>
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

//CSS in JS
// const headerStyle = {
//     color: 'red', 
//     backgroundColor: 'green'
// }

export default Header