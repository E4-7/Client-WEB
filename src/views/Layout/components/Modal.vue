<template>
  <v-dialog
    v-model="openModal"
    max-width="570px"
    class="dialog"
    :scrollable="true"
  >
    <div class="modal-container" :style="{ padding }">
      <slot name="content"></slot>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {};
  },
  props: ['open', 'padding'],
  methods: {},
  computed: {
    openModal: {
      get() {
        return this.open;
      },
      set(newValue) {
        console.log(newValue);
        this.$emit('closeModal');
      },
    },
  },
};
</script>
