<template>
  <Modal id="job-modal">
    <template #modal-title class="bg-success">
      <h4>{{ job.id ? "Edit" : "Create" }} Job</h4>
    </template>
    <template #modal-body>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3 d-flex justify-content-between">
          <div>
            <label for="company" class="form-label">Company</label>
            <input
              type="text"
              class="form-control"
              name="company"
              id="company"
              aria-describedby="company"
              placeholder="Company..."
              required
              v-model="editable.company"/>
          </div>
          <div>
            <label for="salary" class="form-label">Salary</label>
            <input
              type="number"
              class="form-control"
              name="salary"
              id="salary"
              aria-describedby="salary"
              placeholder="Salary..."
              required
              v-model="editable.salary"/>
          </div>
        </div>
        <div class="mb-3 d-flex justify-content-between">
          <div>
            <label for="hours" class="form-label">Hours</label>
            <input
              type="number"
              class="form-control"
              name="hours"
              id="hours"
              aria-describedby="hours"
              placeholder="Hours..."
              required
              v-model="editable.hours"/>
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
            {{ job.id ? "Save" : "Create" }}
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>


<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { jobsService } from '../services/JobsService'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { Job } from '../Models/Job'
import { watchEffect } from '@vue/runtime-core'


export default {
  props: {
    job: {
      type: Job,
      default: () => new Job()
    }
  },
  setup(props) {
    const router = useRouter()
    const editable = ref({})

    // watchEffect runs when it's value it is watching changes
    watchEffect(() => {
      editable.value = { ...props.job }
    })



    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await jobsService.edit(editable.value)
          } else {
            await jobsService.create(editable.value)
          }
          Modal.getOrCreateInstance(document.getElementById('job-modal')).hide()
          router.push({ name: 'JobDetails', params: { id: AppState.activeJob.id } })
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