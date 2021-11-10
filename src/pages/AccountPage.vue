<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    {{ cars }}
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { carsService } from '../services/CarsService'
import { logger } from '../utils/Logger'
export default {
  name: 'Account',
  setup() {
    const account = computed(() => AppState.account)
    onMounted(async () => {
      logger.log(AppState.account)
      await carsService.getAll('?creatorId=' + account.id)
    })

    return {
      account,
      cars: computed(() => AppState.cars)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
