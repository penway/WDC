import { ref, computed } from "vue"

export const admin = ref(false)

// 所有的零件
export const parts = ref([])

// 搜索树层级的栈
export const traceID = ref(["0"])
export const traceName = ref(["速翼 2020"])  

export const localSearch = ref("")  // 局部搜索框字符串

// 当前被搜索的零件列表
export const searchParts = computed(() => {
    return parts.value
    // 匹配 parent ID
    .filter(
        part => part.parentID == traceID.value[traceID.value.length - 1] 
    )
    // 匹配搜索内容，不区分大小写
    .filter(
        part => part.name.toLowerCase().includes(localSearch.value.toLowerCase())
    )
    // 部分数据转两位小数
    .map( part => ({
            ...part,                  // 继承所有数据
            x2: part.c_x.toFixed(2),  // 新建数据取两位小数，因为修改的时候还是希望全精度
            y2: part.c_y.toFixed(2),
            z2: part.c_z.toFixed(2),
    }))
})

export const weight_sum = computed(() => {
    let sum = 0
    parts.value.forEach(part => { if (part.parentID == "0") sum += part.weight })
    return sum
})

export const cox = computed(() => {
    let sum = 0
    parts.value.forEach(part => { if (part.parentID == "0") sum += part.c_x * part.weight })
    return Math.round(sum / weight_sum.value)
})

export const coy = computed(() => {
    let sum = 0
    parts.value.forEach(part => { if (part.parentID == "0") sum += part.c_y * part.weight })
    return Math.round(sum / weight_sum.value)
})

export const coz = computed(() => {
    let sum = 0
    parts.value.forEach(part => { if (part.parentID == "0") sum += part.c_z * part.weight })
    return Math.round(sum / weight_sum.value)
})

// 当前的父零件
export const currentPart = computed(() => 
    traceID.value.length == 1
    ? {
        name: "速翼2020",
        weight: weight_sum.value,
        c_x: cox.value,
        c_y: coy.value,
        c_z: coz.value,
    }
    : parts.value.find(part => 
        part._id == traceID.value[traceID.value.length - 1]
    )
)

export const isPart = ref(false)

export const partAPI = "/api/part/"