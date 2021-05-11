<template>
  <v-card v-if="data.length" outlined>
    <h2 class="text-center">Orders history</h2>
    <v-simple-table dense height="15vh"
      >>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left text-caption" style="border: none">
              Order ID
            </th>
            <th class="text-left text-caption" style="border: none">Symbol</th>
            <th class="text-left text-caption" style="border: none">
              Order Qty
            </th>
            <th class="text-left text-caption" style="border: none">Time</th>
            <th class="text-left text-caption" style="border: none">Side</th>
            <th class="text-left text-caption" style="border: none">Price</th>
            <th class="text-left text-caption" style="border: none">
              Order Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orders" :key="index">
            <td>{{ item.orderID }}</td>
            <td>{{ item.symbol }}</td>
            <td>{{ item.orderQty }}</td>
            <td>{{ item.timestamp | formatDate }}</td>
            <td>{{ item.side }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.ordStatus }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "Order",
  props: {
    data: {
      type: Array,
      default: new Array(),
    },
  },
  computed: {
    orders() {
      return this.data.slice(0).reverse();
    },
  },
};
</script>

<style></style>
