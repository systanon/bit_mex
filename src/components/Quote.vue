<template>
  <v-card outlined>
    <v-simple-table v-if="data.length" dense class="table-detail">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left text-caption" style="border: none">Symbol</th>
            <th class="text-left text-caption" style="border: none">Time</th>
            <th class="text-left text-caption" style="border: none">
              Ask price
            </th>
            <th class="text-left text-caption" style="border: none">
              Ask size
            </th>
            <th class="text-left text-caption" style="border: none">
              Bid price
            </th>
            <th class="text-left text-caption" style="border: none">
              Bid size
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ item.symbol }}</td>
            <td>{{ item.timestamp }}</td>
            <td>{{ item.askPrice }}</td>
            <td>{{ item.askSize }}</td>
            <td>{{ item.bidPrice }}</td>
            <td>{{ item.bidSize }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
// askPrice:59709.5
// askSize:270899
// bidPrice:59706.5
// bidSize:1
// symbol:"XBTUSD"
// timestamp:"2021-05-08T13:44:42.970Z"

export default {
  name: "Quote",
  props: {
    data: {
      type: Array,
      default: new Array(),
    },
  },
};
</script>

<style></style>
