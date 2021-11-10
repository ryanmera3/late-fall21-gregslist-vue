<template>
  <div class="mt-3 selectable">
    <router-link :to="{ name: 'JobDetails', params: { id: job.id } }">
      <div class="bg-light elevation-1 rounded">
        <img
          class="job-img rounded-top w-100"
          :src="job.imgUrl"
          alt="job image"
        />
        <div class="p-1 text-center">
          <p class="m-0">
            <b>{{ job.company }} - {{ job.salary }}</b>
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>