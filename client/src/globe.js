import { ref, computed } from "vue"

export const parts = ref([])

export const traceID = ref(["0"])
export const traceName = ref(["速翼 2020"])

export const localSearch = ref("")
export const searchParts = computed(() => {
    return parts.value
    .filter(
        part => part.parentID == traceID.value[traceID.value.length - 1] 
    )
    .filter(
        part => part.name.toLowerCase().includes(localSearch.value.toLowerCase())
    )
    .map( part => ({
            ...part,
            c_x: part.c_x.toFixed(2),
            c_y: part.c_y.toFixed(2),
            c_z: part.c_z.toFixed(2),
    }))
})

export const isPart = ref(false)

export const partAPI = "/api/part/"