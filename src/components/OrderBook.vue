<template>
  <v-card outlined>
    <v-simple-table v-if="data.length" dense class="table-detail">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left text-caption" style="border: none">symbol</th>
            <th class="text-left text-caption" style="border: none">price</th>
            <th class="text-left text-caption" style="border: none">size</th>
            <th class="text-left text-caption" style="border: none">side</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td>{{ item.symbol }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.size }}</td>
            <td>{{ item.side }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
// id: 15594010000
// price: 59900
// side: "Sell"
// size: 20
// symbol: "XBTUSD"
export default {
  name: "OrderBook",
  props: {
    data: {
      type: Array,
      default: new Array(),
    },
  },
};
</script>

<style></style>
