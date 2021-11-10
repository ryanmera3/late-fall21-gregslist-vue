<template>
  <Modal id="car-modal">
    <template #modal-title class="bg-success">
      <h4>{{ car.id ? "Edit" : "Create" }} Car</h4>
    </template>
    <template #modal-body>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3 d-flex justify-content-between">
          <div>
            <label for="make" class="form-label">Make</label>
            <input
              type="text"
              class="form-control"
              name="make"
              id="make"
              aria-describedby="make"
              placeholder="Make..."
              required
              v-model="editable.make"
            />
          </div>
          <div>
            <label for="model" class="form-label">Model</label>
            <input
              type="text"
              class="form-control"
              name="model"
              id="model"
              aria-describedby="model"
              placeholder="Model..."
              required
              v-model="editable.model"
            />
          </div>
        </div>
        <div class="mb-3 d-flex justify-content-between">
          <div>
            <label for="year" class="form-label">Year</label>
            <input
              type="number"
              class="form-control"
              name="year"
              id="year"
              aria-describedby="year"
              placeholder="Year..."
              min="1950"
              max="2022"
              required
              v-model="editable.year"
            />
          </div>
          <div>
            <label for="color" class="form-label">Color</label>
            <input
              type="color"
              v-model="editable.color"
              class="form-control"
              name="color"
              id="color"
              aria-describedby="color"
              required
            />
          </div>
          <div>
            <label for="price" class="form-label">Price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="price"
              aria-describedby="price"
              placeholder="Price..."
              min="1"
              required
              v-model="editable.price"
            />
          </div>
        </div>
        <div class="mb-3">
          <div>
            <label for="imgUrl" class="form-label">Image Url</label>
            <input
              type="url"
              class="form-control"
              name="imgUrl"
              id="imgUrl"
              aria-describedby="imgUrl"
              placeholder="Image Url..."
              required
              v-model="editable.imgUrl"
            />
          </div>
        </div>
        <div class="mb-3">
          <div>
            <label for="description" class="form-label">Description</label>
            <textarea
              type="text"
              class="form-control"
              name="description"
              id="description"
              aria-describedby="description"
              placeholder="Description..."
              min="5"
              max="250"
              required
              v-model="editable.description"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary">
            {{ car.id ? "Save" : "Create" }}
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>


<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { carsService } from '../services/CarsService'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { Car } from '../Models/Car'
import { watchEffect } from '@vue/runtime-core'


export default {
  props: {
    car: {
      type: Car,
      default: () => new Car()
    }
  },
  setup(props) {
    const router = useRouter()
    const editable = ref({})

    // watchEffect is a method that runs anytime any of its values change
    watchEffect(() => {
      editable.value = { ...props.car }
    })



    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await carsService.edit(editable.value)
          } else {
            await carsService.create(editable.value)
          }
          // if successful close modal
          Modal.getOrCreateInstance(document.getElementById('car-modal')).hide()
          router.push({ name: 'CarDetails', params: { id: AppState.activeCar.id } })
          // change route to car details for this new car
        } catch (error) {
          logger.error(error)
          Pop.toast('Failed to Create', 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>