export class House {
  constructor(houseData = {}) {
    this.id = houseData.id
    this.address = houseData.address
    this.bathrooms = houseData.bathrooms
    this.bedrooms = houseData.bedrooms
    this.description = houseData.description
    this.price = houseData.price
    this.imgUrl = houseData.imgUrl
    this.creatorId = houseData.creatorId
    this.creator = houseData.creator || {}
  }
}