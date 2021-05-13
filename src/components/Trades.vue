<template>
  <v-card flat outlined>
    <h2 class="text-center py-4">Trade</h2>
    <v-simple-table v-if="data.length" dense height="60vh">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left text-caption" style="border: none">Time</th>
            <th class="text-left text-caption" style="border: none">Open</th>
            <th class="text-left text-caption" style="border: none">High</th>
            <th class="text-left text-caption" style="border: none">Low</th>
            <th class="text-left text-caption" style="border: none">Close</th>
            <th class="text-left text-caption" style="border: none">
              Gross Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ item.timestamp | formatTime }}</td>
            <td>{{ item.open }}</td>
            <td>{{ item.high }}</td>
            <td>{{ item.low }}</td>
            <td>{{ item.close }}</td>
            <td>{{ item.grossValue === undefined ? "-" : item.grossValue }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "Trades",
  props: {
    data: {
      type: Array,
      default: new Array(),
    },
  },
};
</script>
