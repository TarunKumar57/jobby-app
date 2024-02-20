import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsData} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similarJobsData
  return (
    <li className="similar-jobs-list-item-container">
      <div className="similar-jobs-list-logo-role-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="logo"
        />
        <div className="similar-jobs-list-role-rating-container">
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
      <h1 className="desc-head">Description</h1>
      <p className="disc-para">{jobDescription}</p>
      <div className="similar-jobs-list-icons-container">
        <p className="location">
          <MdLocationOn className="icon" /> {location}
        </p>
        <p className="work-type">
          <BsBriefcaseFill className="icon" /> {employmentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarJobs
