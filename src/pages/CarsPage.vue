<template>
  <div class="cars container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-between p-3">
        <h2>Cars</h2>
        <button
          class="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#car-modal"
        >
          <i class="mdi mdi-plus"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="c in cars" :key="c.id">
        <Car :car="c" />
      </div>
    </div>
  </div>
  <CarFormModal />
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { carsService } from '../services/CarsService'
import { AppState } from '../AppState'


export default {
  setup() {
    onMounted(async () => {
      try {
        await carsService.getAll()
      } catch (error) {
        logger.log(error)
        Pop.toast('Something went wrong', 'error')
      }
    })
    return {
      cars: computed(() => AppState.cars)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>