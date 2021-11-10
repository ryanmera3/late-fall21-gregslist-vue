<template>
  <Modal id="house-modal">
    <template #modal-title class="bg-success">
      <h4>{{ house.id ? "Edit" : "Create" }} House</h4>
    </template>
    <template #modal-body>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3 d-flex justify-content-between">
          <div>
            <label for="address" class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="address"
              aria-describedby="address"
              placeholder="Address..."
              required
              v-model="editable.address"/>
          </div>
          <div>
            <label for="bedrooms" class="form-label">Bedrooms</label>
            <input
              type="number"
              class="form-control"
              name="bedrooms"
              id="bedrooms"
              aria-describedby="bedrooms"
              placeholder="Bedrooms..."
              required
              v-model="editable.bedrooms"/>
          </div>
        </div>
        <div class="mb-3 d-flex justify-content-between">
          <div>
            <label for="bathrooms" class="form-label">bathrooms</label>
            <input
              type="number"
              class="form-control"
              name="bathrooms"
              id="bathrooms"
              aria-describedby="bathrooms"
              placeholder="Bath..."
              required
              v-model="editable.bathrooms"/>
          </div>
          <div>
            <label for="built" class="form-label">built</label>
            <input
              type="number"
              v-model="editable.built"
              class="form-control"
              name="built"
              id="built"
              min=1900
              aria-describedby="built"
              required/>
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
              v-model="editable.price"/>
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
              v-model="editable.imgUrl"/>
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
              v-model="editable.description"></textarea>
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
            {{ house.id ? "Save" : "Create" }}
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>


<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { housesService } from '../services/HousesService'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { House } from '../Models/House'
import { watchEffect } from '@vue/runtime-core'


export default {
  props: {
    house: {
      type: House,
      default: () => new House()
    }
  },
  setup(props) {
    const router = useRouter()
    const editable = ref({})

    // watchEffect runs when it's value it is watching changes
    watchEffect(() => {
      editable.value = { ...props.house }
    })



    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await housesService.edit(editable.value)
          } else {
            await housesService.create(editable.value)
          }
          Modal.getOrCreateInstance(document.getElementById('house-modal')).hide()
          router.push({ name: 'HouseDetails', params: { id: AppState.activeHouse.id } })
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