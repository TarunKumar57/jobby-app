import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobsFilterGroups from '../JobsFilterGroups'
import JobsCard from '../JobsCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    employTypeList: [],
    activeSalaryRange: '',
    searchInput: '',
    jobsData: [],
    apiStatusProfile: apiStatusConstants.initial,
    apiStatusJob: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({
      apiStatusProfile: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrlProfile = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrlProfile, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        apiStatusProfile: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatusProfile: apiStatusConstants.failure,
      })
    }
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        data-testid="button"
        onClick={this.getProfileData}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-paragraph">{shortBio}</p>
        {/*  <h1 className="profile-heading">Tarun Kumar</h1>
        <p className="profile-paragraph">Frontend Developer</p> */}
      </div>
    )
  }

  renderProfileView = () => {
    const {apiStatusProfile} = this.state
    switch (apiStatusProfile) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobsData = async () => {
    this.setState({apiStatusJob: apiStatusConstants.inProgress})
    const {employTypeList, activeSalaryRange, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrlJobs = `https://apis.ccbp.in/jobs?employment_type=${employTypeList.join()}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrlJobs, options)
    console.log(response.status)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatusJob: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusJob: apiStatusConstants.failure})
    }
  }

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-paragraph">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  onRetry = () => {
    this.getJobsData()
  }

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
      <button type="button" onClick={this.onRetry} className="retry-button">
        Retry
      </button>
    </div>
  )

  changeEmploymentType = event => {
    const {value} = event.target
    const {employTypeList} = this.state

    if (employTypeList.includes(value)) {
      const updatedList = employTypeList.filter(eachItem => eachItem !== value)
      this.setState({employTypeList: updatedList}, this.getJobsData)
    } else {
      this.setState(
        prevState => ({
          employTypeList: [...prevState.employTypeList, value],
        }),
        this.getJobsData,
      )
    }
  }

  changeSalaryRanges = event => {
    this.setState({activeSalaryRange: event.target.value}, this.getJobsData)
  }

  renderProfileFilter = () => {
    const {searchInput} = this.state
    return (
      <div className="jobs-container">
        <div className="mobile-search-container">
          <input
            type="search"
            placeholder="Search"
            className="search-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.onSearchButton}
          >
            . <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderProfileView()}
        <JobsFilterGroups
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          changeEmploymentType={this.changeEmploymentType}
          changeSalaryRanges={this.changeSalaryRanges}
        />
        <hr className="mobile-hr" />
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsData} = this.state
    return (
      <>
        {jobsData.length > 0 ? (
          <ul className="jobs-list-container">
            {jobsData.map(each => (
              <JobsCard key={each.id} jobsData={each} />
            ))}
          </ul>
        ) : (
          this.renderNoJobs()
        )}
      </>
    )
  }

  renderJobsView = () => {
    const {apiStatusJob} = this.state
    switch (apiStatusJob) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchButton = () => {
    this.getJobsData()
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-route-container">
          {this.renderProfileFilter()}

          <div>
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onSearchButton}
              >
                . <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsView()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
