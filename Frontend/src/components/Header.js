import PropTypes from 'prop-types'

const Header = ({title , onCreate , showCreate}) => {
    return (
        <header className='header' className='text-center'>
        {/* add fields which we want under header this will display 
        default value passed from app.js when header is called */} 
       <button className="btn btn-success" 
        onClick={onCreate}>{showCreate ? "Close" : "Add Meme"}</button>
        </header>
        
    )
}


Header.defaultProps ={
     title: 'XMEME CHECK',
 }

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
