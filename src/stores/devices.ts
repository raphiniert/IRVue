import { defineStore } from 'pinia'

interface IRDeviceDelete {
    message: string
}

export type IRDeviceBase = {
    name: string
    signals: [] | null
}

interface IRDeviceUpdate extends IRDeviceBase {
    id: number
}

interface IRDevice extends IRDeviceUpdate {
    created_at: string
    modified_at: string
}

export const useDeviceStore = defineStore('device', {
    state: () => ({
      objects: [] as IRDevice[]
    }),
    getters: {
      getObjectById: (state) => {
        return (objId: number) => state.objects.find((obj: IRDevice) => obj.id === objId)
      }
    },
    actions: {
      async fetchObjectList() {
        console.log(`Getting object list for: devices.`)
        const gResponse = await fetch(`http://127.0.0.1:8000/api/v1/devices`)
        if(gResponse.status == 200) {
          this.objects = await gResponse.json()
        }
      },
      async addObject(obj: IRDeviceBase) {
        const gResponse = await fetch(
          `http://127.0.0.1:8000/api/v1/devices`, {
            method: "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify(obj)
          }
        )
        if(gResponse.status == 201) {
          this.fetchObjectList()
          return gResponse.json().then((newObj: IRDevice) => {
            return newObj
          })
        }
      },
      async updateObject(obj: IRDeviceUpdate) {
        const gResponse = await fetch(
          `http://127.0.0.1:8000/api/v1/devices/${obj.id}`, {
            method: "PATCH",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify(obj)
          }
        )
        if(gResponse.status == 200) {
          this.fetchObjectList()
          return gResponse.json().then((updatedObj: IRDevice) => {
            return updatedObj
          })
        }
        // something went wrong
      },
      async deleteObject(objId: number) {
        const gResponse = await fetch(
          `http://127.0.0.1:8000/api/v1/devices/${objId}`, {
            method: "DELETE",
            headers:{
              "Content-Type":"application/json"
            },
          }
        )
        if(gResponse.status == 200) {
          this.fetchObjectList()
          return gResponse.json().then((data: IRDeviceDelete) => {
            return data
          })
        }
      }
    },
  })
  