<template>
  <div class="job-details container-fluid">
    <div class="row mt-5">
      <div class="col text-center">
        <img :src="job.imgUrl" alt="" />
      </div>
      <div class="row mt-3 justify-content-center">
        <div class="col-md-8">
          <div class="bg-white rounded elevation-1 p-3">
            <h4>{{ job.company }} - {{ job.hours }} hours</h4>
            <div class="d-flex align-items-center">
              <p class="m-0">
                <b>${{ job.salary }}</b>
              </p>
              <div class="mx-2"></div>
            </div>
            <p>{{ job.description }}</p>
            <div class="user-tag d-flex align-items-center" v-if="job.creator">
              <img class="rounded-pill" :src="job.creator.picture" alt="" />
              <p class="m-0 ps-3">{{ job.creator.name }}</p>
            </div>
            <div
              v-if="job.creatorId === account.id"
              class="job-controls d-flex justify-content-end"
            >
              <button
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#job-modal"
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
  <JobFormModal :job="job" />
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { jobsService } from '../services/JobsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async () => {
      logger.log('JOB ID', route.params.id)
      try {
        await jobsService.getById(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast('Could not get that job', 'error')
        router.push({ name: 'Jobs' })
      }

    })
    return {
      job: computed(() => AppState.activeJob),
      account: computed(() => AppState.account),

      async remove() {
        try {
          if (await Pop.confirm()) {

            await jobsService.remove()
            router.push({ name: 'Jobs' })
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