<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat>
      <v-toolbar dark dense color="error" class="px-4">
        <v-icon class="mr-4"> mdi-alert </v-icon>
        <v-toolbar-title> Error </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon large> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center py-4">
        <h3>{{ errorMessage || "Unknown Error" }}</h3>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ErrorMessage",
  computed: {
    ...mapState(["error", "errorMessage"]),
    dialog: {
      get() {
        return this.error;
      },
      set(val) {
        !val && this.resetError();
      },
    },
  },
  methods: {
    ...mapMutations({
      setError: "ERROR",
    }),
    resetError() {
      this.setError(null);
    },
  },
};
</script>
