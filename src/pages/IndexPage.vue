<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-slide-item
          v-for="entry in entries"
          :key="entry.id"
          @right="onEntrySlideRight($event, entry.id)"
          left-color="positive"
          right-color="negative"
        >
          <template v-slot:right>
            <q-icon name="delete" />
          </template>

          <q-item>
            <q-item-section class="text-bold">
              {{ entry.name }}
            </q-item-section>

            <q-item-section
              class="text-bold"
              :class="amountColor(entry.amount)"
              side
            >
              {{ formatCurrency(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>

    <q-footer class="bg-white shadow-up-3">
      <div class="row q-py-sm q-px-md">
        <div class="col text-grey-7 text-h6">Balance:</div>
        <div :class="amountColor(balance)" class="col text-h6">
          {{ formatCurrency(balance) }}
        </div>
      </div>
      <q-form
        @submit.prevent="addEntry"
        class="row q-col-gutter-sm q-py-sm q-pr-sm bg-primary"
      >
        <div class="col">
          <q-input
            outlined
            dense
            bg-color="white"
            placeholder="Name"
            v-model="addEntryForm.name"
            ref="nameRef"
            required
          />
        </div>
        <div class="col">
          <q-input
            input-class="text-right"
            type="number"
            step="0.01"
            outlined
            dense
            bg-color="white"
            placeholder="Amount"
            v-model.number="addEntryForm.amount"
            required
          />
        </div>
        <div class="col col-auto flex items-center">
          <q-btn
            type="submit"
            round
            color="white"
            text-color="primary"
            icon="add"
          />
        </div>
      </q-form>
    </q-footer>
  </q-page>

  <q-dialog v-model="dialog" backdrop-filter="blur(4px)" persistent>
  <q-card style="width: 300px;">
    <q-card-section class="row items-center">
      <span class="text-h6">Delete entry?</span>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" @click="closeDialog" />
      <q-btn flat label="Delete" color="negative" @click="deleteEntry" />
    </q-card-actions>
  </q-card>
</q-dialog>

</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useQuasar, uid } from "quasar";
import { formatCurrency } from "../composables/formatCurrency";
import { amountColor } from "../composables/amountColor";

const $q = useQuasar();

// Initial entries
const entries = ref([
  { id: "1", name: "Salary", amount: 4999.99 },
  { id: "2", name: "Rent", amount: -1999 },
  { id: "3", name: "Groceries", amount: -499 },
  { id: "4", name: "Electricity", amount: -299 },
  { id: "5", name: "Nothing", amount: 0 },
  { id: "6", name: "Something", amount: -202.99 },
]);

// Computed total balance
const balance = computed(() => {
  return entries.value.reduce((accumulator, { amount }) => accumulator + amount, 0);
});

// Form refs
const nameRef = ref(null);
const addEntryFormDefault = { name: "", amount: null };
const addEntryForm = reactive({ ...addEntryFormDefault });

// Reset form
const addEntryFormReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault);
  nameRef.value?.focus();
};

// Add new entry
const addEntry = () => {
  const newEntry = { ...addEntryForm, id: uid() };
  entries.value.push(newEntry);
  addEntryFormReset();
};

// Dialog controls
const dialog = ref(false);
const entryToDelete = ref(null);

const onEntrySlideRight = ({ reset }, id) => {
  entryToDelete.value = id;
  dialog.value = true;
  reset();
};

const closeDialog = () => {
  dialog.value = false;
  entryToDelete.value = null;
};

const deleteEntry = () => {
  if (entryToDelete.value) {
    entries.value = entries.value.filter(
      (entry) => entry.id !== entryToDelete.value
    );
  }
  closeDialog();
  showNotification()
};

/* Notifications */
const showNotification = (position) => {
  $q.notify({
    message: 'you deleted an entry',
    color: 'primary',
    position: 'top'
  })
}
</script>
