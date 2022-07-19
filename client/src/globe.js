import { ref, computed } from "vue"

export const parts = ref([])
export const currentParts = computed(() => {
    return parts.value.filter((x) => { return x.parentID == traceID.value[traceID.value.length - 1] })
})

export const traceID = ref(["0"])
export const traceName = ref(["速翼 2020"])
export const isPart = ref(false)

export const partAPI = "/api/part/"