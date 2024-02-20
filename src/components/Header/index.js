import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <>
      <nav className="nav-container">
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <ul className="nav-list-container">
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
        </ul>
        <Link to="/login" className="link">
          <button
            type="button"
            onClick={onClickLogout}
            className="logout-button"
          >
            Logout
          </button>
        </Link>
      </nav>

      <nav className="nav-mobile-container">
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <ul className="nav-mobile-icons-list">
          <li className="nav-mobile-icon">
            <Link to="/" className="link">
              <AiFillHome />
            </Link>
          </li>
          <li className="nav-mobile-icon">
            <Link to="/jobs" className="link">
              <BsBriefcaseFill />
            </Link>
          </li>
          <li className="nav-mobile-icon">
            <Link to="/login" className="link">
              <FiLogOut onClick={onClickLogout} />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default withRouter(Header)
