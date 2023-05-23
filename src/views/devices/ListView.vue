<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import type { Ref } from 'vue'
  import { useDeviceStore } from '@/stores/devices'
  import type {IRDeviceBase} from '@/stores/devices'

  const store = useDeviceStore()

  // reactive state
  const obj: Ref<IRDeviceBase> = ref({name: '', signals: []})

  async function addObject(obj: IRDeviceBase) {
    const newObj = await store.addObject(obj)
  }
  // lifecycle hooks
  onMounted(() => {
    store.fetchObjectList()
  })
</script>

<template>
  <main>
    <div class="wrapper">
      <h1>This is the devices list view</h1>
      <ul>
        <li v-for="obj in store.objects">{{ obj.name }}</li>
      </ul>
      <form @submit.prevent="">
        <label for="name">Name</label>
        <input v-model="obj['name']" id="name" type="text" required="true">
        <button @click=" addObject(obj)">Add Device</button>
      </form>
    </div>
  </main>
</template>
  
<style>
</style>
  