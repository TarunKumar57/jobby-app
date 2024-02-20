import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobsDetailsRoute extends Component {
  state = {
    jobDetailsData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.jobDetails()
  }

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  jobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedSimilarData(eachSimilarJob),
      )
      this.setState({
        jobDetailsData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryButton = () => this.jobDetails()

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderJobsDetailsView = () => {
    const {jobDetailsData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      rating,
      title,
      packagePerAnnum,
      skills,
    } = jobDetailsData
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <div className="jobs-item-details-container">
          <div className="job-details-logo-role-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logo"
            />
            <div className="job-details-role-rating-container">
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
          <div className="job-details-location-icons-container">
            <div className="job-details-icons-container">
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
          <div className="desc-visit-container">
            <h1 className="desc-heading">Description</h1>
            <a href={companyWebsiteUrl} className="visit-link">
              Visit <FiExternalLink className="link-icon" />
            </a>
          </div>
          <p className="desc-paragraph">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-item-list-container">
            {skills.map(each => (
              <li className="skills-item-container" key={each.name}>
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skills-item-img"
                />
                <p className="skills-item-text">{each.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-company-container">
            <div>
              <h2 className="life-at-company-head">Life at Company</h2>
              <p className="life-at-company-para">{description}</p>
            </div>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="similar-jobs-head">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobsData.map(each => (
            <SimilarJobs key={each.id} similarJobsData={each} />
          ))}
        </ul>
      </>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-Details-route-container">{this.renderView()}</div>
      </>
    )
  }
}
export default JobsDetailsRoute
