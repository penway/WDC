import { ref, computed } from "vue"

export const parts = ref([])

export const traceID = ref(["0"])
export const traceName = ref(["速翼 2020"])
export const currentParts = computed(() => {
    return parts.value.filter(
        part => part.parentID == traceID.value[traceID.value.length - 1] 
    )
})

export const localSearch = ref("")
export const searchParts = computed(() => {
    return currentParts.value.filter(
        part => part.name.toLowerCase().includes(localSearch.value.toLowerCase())
    )
})

export const globalSearch = ref("")

export const isPart = ref(false)

export const partAPI = "/api/part/"