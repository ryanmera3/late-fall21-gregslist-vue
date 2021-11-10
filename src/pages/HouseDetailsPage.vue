<template>
  <div class="house-details container-fluid">
    <div class="row mt-5">
      <div class="col text-center">
        <img :src="house.imgUrl" alt="" />
      </div>
      <div class="row mt-3 justify-content-center">
        <div class="col-md-8">
          <div class="bg-white rounded elevation-1 p-3">
            <h4>{{ house.address }} - {{ house.price }} - {{ house.bedrooms }}</h4>
            <div class="d-flex align-items-center">
              <p class="m-0">
                <b>${{ house.bathrooms }}</b>
              </p>
              <div class="mx-2"></div>
            </div>
            <p>{{ house.description }}</p>
            <div class="user-tag d-flex align-items-center" v-if="house.creator">
              <img class="rounded-pill" :src="house.creator.picture" alt="" />
              <p class="m-0 ps-3">{{ house.creator.name }}</p>
            </div>
            <div
              v-if="house.creatorId === account.id"
              class="house-controls d-flex justify-content-end"
            >
              <button
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#house-modal"
              >
                edit
              </button>
              <button class="btn btn-danger mx-3" @click="remove">
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <HouseFormModal :house="house" />
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { housesService } from '../services/HousesService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async () => {
      logger.log('HOUSE ID', route.params.id)
      try {
        await housesService.getById(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast('Could not get that house', 'error')
        router.push({ name: 'Houses' })
      }

    })
    return {
      house: computed(() => AppState.activeHouse),
      account: computed(() => AppState.account),

      async remove() {
        try {
          if (await Pop.confirm()) {

            await housesService.remove()
            router.push({ name: 'Houses' })
          }
        } catch (error) {
          logger.error(error)
          Pop.toast('Failed to Delete', 'error')

        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

.user-tag {
  & img {
    height: 50px;
  }
}
</style>