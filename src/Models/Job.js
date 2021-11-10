export class Job {
  constructor(jobData = {}) {
    this.id = jobData.id
    this.company = jobData.company
    this.salary = jobData.salary
    this.description = jobData.description
    this.hours = jobData.hours
    this.imgUrl = jobData.imgUrl
    this.creatorId = jobData.creatorId
    this.creator = jobData.creator || {}
  }
}