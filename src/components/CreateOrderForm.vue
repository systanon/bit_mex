<template>
  <v-card class="pa-4" :disabled="!symbol">
    <h2 class="text-center">Create order</h2>
    <v-form ref="form">
      <v-text-field v-model.number="amount" :rules="[rules.onlyNumbers]" />
    </v-form>
    <v-card-actions class="justify-center">
      <v-btn @click="submit('Buy')" :disabled="disabled">buy</v-btn>
      <v-btn @click="submit('Sell')" :disabled="disabled">sell</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CreateOrderForm",
  props: {
    symbol: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      amount: 1,
      rules: {
        onlyNumbers: (v) => !/[^0-9|^.]/g.test(v) || "Only digits",
      },
    };
  },
  computed: {
    disabled() {
      return !this.amount || typeof this.amount !== "number" || this.amount < 0;
    },
  },
  methods: {
    submit(side) {
      if (!this.symbol || !this.amount || !this.$refs.form.validate()) return;
      const order = {
        ordType: "Market",
        symbol: this.symbol,
        orderQty: this.amount,
        side,
      };
      this.$emit("submit", order);
    },
  },
};
</script>
