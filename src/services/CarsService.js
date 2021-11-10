import { AppState } from "../AppState"
import { Car } from '../Models/Car'
import { logger } from "../utils/Logger"
import { api } from './AxiosService'

class CarsService {
  async getAll(carQuery = "") {
    const res = await api.get('api/cars' + carQuery)
    logger.log(res.data)
    AppState.cars = res.data.map(c => new Car(c))
  }

  async getById(id) {
    const res = await api.get('api/cars/' + id)
    logger.log(res.data)
    AppState.activeCar = new Car(res.data)
  }

  async create(car) {
    const res = await api.post('api/cars', car)
    logger.log(res.data)
    AppState.cars.push(new Car(res.data))
    AppState.activeCar = new Car(res.data)
  }

  async edit(car) {
    const res = await api.put('api/cars/' + car.id, car)
    logger.log(res.data)
    const updatedCar = new Car(res.data)
    AppState.activeCar = updatedCar
    const index = AppState.cars.findIndex(c => c.id === updatedCar.id)
    if (index === -1) {
      AppState.cars.push(updatedCar)
      return
    }
    AppState.cars.splice(index, 1, updatedCar)

  }
  async remove() {
    const res = await api.delete('api/cars/' + AppState.activeCar.id)
    logger.log(res.data)
    AppState.cars = AppState.cars.filter(c => c.id !== AppState.activeCar.id)
    AppState.activeCar = new Car()
  }
}

export const carsService = new CarsService()