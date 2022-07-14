<template>
  <div class="main">
    <el-container>
      <el-aside width="20%">
        <!-- Basic Information -->
        <h1>Parts List</h1>
        <h4>Total Weight: {{ weight_sum }} kg</h4>
        <h4>Centor of Gravity: </h4>
        <ul>
          <li>{{ cox }}</li>
          <li>{{ coy }}</li>
          <li>{{ coz }}</li>
        </ul>

        <!-- New Part Button & dialog -->
        <el-container>
          <el-button @click="newPartDialog = !newPartDialog">New Part</el-button>
          <el-dialog v-model="newPartDialog" title="Define New Part">
            <el-form class="form">
              <p>Name:</p>
              <el-input v-model="name" type="text" placeholder="enter name" />

              <el-input-number v-model="weight" :precision="2" /> weight<br />
              <el-input-number v-model="c_x" /> x<br />
              <el-input-number v-model="c_y" /> y<br />
              <el-input-number v-model="c_z" /> z<br />
              <el-switch v-model="symmetry"/>symmetry

              <el-button type="primary" @click="addPart" style="float: right">Done</el-button>
              <el-button @click="addPart(false)" style="float: right">Add Part</el-button>
            </el-form>
          </el-dialog>
        </el-container>
      </el-aside>

      <el-main>
        <el-scrollbar height="500px">
          <!-- PART CARDS -->
          <el-card v-for="(part, index) in parts" :key="part._id" shadow="hover">
            <template #header>
              <div class="part-title">
                <span class="part-name">{{ part.name }}</span>

                <!-- Edit Button -->
                <el-button @click="toggleEditPartDialog(part)">Edit</el-button>
                <el-dialog v-model="part.editPartDialog" title="Edit Part">
                  <el-form class="form">
                    <p>Name:</p>
                    <el-input v-model="name" type="text" placeholder="enter name" />

                    <el-input-number v-model="weight" :precision="2" /> weight<br />
                    <el-input-number v-model="c_x" /> x<br />
                    <el-input-number v-model="c_y" /> y<br />
                    <el-input-number v-model="c_z" /> z

                    <el-button type="primary" @click="editPart(part)" style="float: right">Edit Part</el-button>
                  </el-form>
                </el-dialog>

                <!-- Delete Button-->
                <el-popconfirm title="Are you sure to delete this?" @confirm="removePart(part, index)">
                  <template #reference>
                    <el-button style="float: right">Del</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </template>
            <span class="part-weight">weight: {{ part.weight }}</span><br />
            <span class="part-x">x: {{ part.c_x }}</span><br />
            <span class="part-y">y: {{ part.c_y }}</span><br />
            <span class="part-z">z: {{ part.c_z }}</span>
          </el-card>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import axios from "axios"
import { ref, computed, onMounted } from "vue"
const partAPI = "/api/partList/"

const parts = ref([])
const name = ref("")
const weight = ref(0)
const newPartDialog = ref(false)

// variables for input dialog
const c_x = ref(0)
const c_y = ref(0)
const c_z = ref(0)
const symmetry = ref(false)

// computed variables of total weight and CoG
const weight_sum = computed(() => {
  let sum = 0
  parts.value.forEach(part => sum += part.weight)
  return sum
})

const cox = computed(() => {
  let sum = 0
  parts.value.forEach(part => sum += part.c_x * part.weight)
  return sum / weight_sum.value
})

const coy = computed(() => {
  let sum = 0
  parts.value.forEach(part => sum += part.c_y * part.weight)
  return sum / weight_sum.value
})

const coz = computed(() => {
  let sum = 0
  parts.value.forEach(part => sum += part.c_z * part.weight)
  return sum / weight_sum.value
})

onMounted(async () => {
  const response = await axios.get(partAPI);
  // add one attribute "editPartDialog" for controlling each part
  parts.value = response.data.map(p => ({ ...p, editPartDialog: false }));
})

async function addPart(close) {
  var response;
  if (symmetry.value) {
    await axios.post(partAPI, {
      name: name.value,
      weight: weight.value,
      c_x: c_x.value,
      c_y: c_y.value,
      c_z: c_z.value,
    });
    response = await axios.post(partAPI, {
      name: name.value + "-sym",
      weight: weight.value,
      c_x: c_x.value,
      c_y: -c_y.value,
      c_z: c_z.value,
    });
  } else {
    response = await axios.post(partAPI, {
      name: name.value,
      weight: weight.value,
      c_x: c_x.value,
      c_y: c_y.value,
      c_z: c_z.value,
    });
  }

  parts.value.push(response.data)
  resetInputValues()
  if (close) {
    newPartDialog.value = false;
  }
}

async function removePart(item, index) {
  const succeed = await axios.delete(partAPI + item._id);
  if (succeed) {
    parts.value.splice(index)
  } else {
    alert("Deletion Failed!")
  }
}

function toggleEditPartDialog(item) {
  item.editPartDialog = true;
  name.value = item.name;
  weight.value = item.weight;
  c_x.value = item.c_x;
  c_y.value = item.c_y;
  c_z.value = item.c_z;
}

function resetInputValues() {
  // to reset input values to default
  name.value = "";
  weight.value = c_x.value = c_y.value = c_z.value = 0;
}

async function editPart(item) {
  const response = await axios.patch(partAPI + item._id, {
    name: name.value,
    weight: weight.value,
    c_x: c_x.value,
    c_y: c_y.value,
    c_z: c_z.value,
  })
  parts.value = response.data

  console.log(response.data)
  resetInputValues()
}


</script>

<style>
</style>
