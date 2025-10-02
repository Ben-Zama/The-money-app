<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item v-for="entry in entries" :key="entry.id">
          <q-item-section class="text-bold"> {{ entry.name }} </q-item-section>

          <q-item-section class="text-bold" :class="amountColor(entry.amount)" side>
            {{ formatCurrency(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

import { formatCurrency } from "../composables/formatCurrency";
import { amountColor } from "../composables/amountColor";

const entries = ref([
  {
    id: "1",
    name: "Salary",
    amount: 4999.99,
  },
  {
    id: "2",
    name: "Rent",
    amount: -1999,
  },
  {
    id: "3",
    name: "Groceries",
    amount: -499,
  },
  {
    id: "4",
    name: "Electricity",
    amount: -299,
  },
  {
    id: "5",
    name: "Nothing",
    amount: 0,
  },
]);
</script>
