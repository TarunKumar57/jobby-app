import './index.css'

const JobsFilterGroups = props => {
  const renderEmploymentTypes = () => {
    const {employmentTypesList, changeEmploymentType} = props

    return (
      <ul>
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              className="filter-input"
              value={each.employmentTypeId}
              onChange={changeEmploymentType}
            />
            <label htmlFor={each.employmentTypeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  const renderEmploymentTypesList = () => (
    <div>
      <h3>Type of Employment</h3>
      {renderEmploymentTypes()}
    </div>
  )

  const renderSalaryRanges = () => {
    const {salaryRangesList, changeSalaryRanges} = props

    return (
      <ul>
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId}>
            <input
              type="radio"
              className="filter-input"
              name="option"
              id={each.salaryRangeId}
              value={each.salaryRangeId}
              onChange={changeSalaryRanges}
            />
            <label htmlFor={each.salaryRangeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  const renderSalaryRangesList = () => (
    <>
      <h3>Salary Range</h3>
      {renderSalaryRanges()}
    </>
  )

  return (
    <>
      <hr className="list-hr" />
      {renderEmploymentTypesList()}
      <hr className="list-hr" />
      {renderSalaryRangesList()}
    </>
  )
}

export default JobsFilterGroups
