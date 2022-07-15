import { ref, computed } from "vue"

export const parts = ref([])
export const currentParts = computed(() => {
    return parts.value.filter((x) => { return x.componentID == traceCID.value })
})
export const components = ref([])

export const traceCID = ref(0)
export const traceCname = ref("")

export const partAPI = "/api/part/"
export const componentAPI = "/api/component/"