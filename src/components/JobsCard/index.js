import {Link} from 'react-router-dom'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const JobsCard = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
    id,
  } = jobsData
  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="jobs-list-item-container" key={id}>
        <div className="jobs-list-logo-role-container">
          <img src={companyLogoUrl} alt="company logo" className="logo" />
          <div className="jobs-list-role-rating-container">
            <h1 className="role">{title}</h1>
            <p className="rating">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
                alt="star"
                className="star"
              />
              {rating}
            </p>
          </div>
        </div>
        <div className="jobs-list-location-icons-container">
          <div className="jobs-list-icons-container">
            <p className="location">
              <MdLocationOn className="icon" /> {location}
            </p>
            <p className="work-type">
              <BsBriefcaseFill className="icon" /> {employmentType}
            </p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="jobs-list-hr" />
        <h1 className="desc-head">Description</h1>
        <p className="desc-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
