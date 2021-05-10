<template>
  <v-card outlined>
    <v-simple-table v-if="instruments" dense class="table-detail">
      <template v-slot:default>
        <!-- <thead>
        <tr>
          <th class="text-left text-caption" style="border: none">SUNRISE</th>
          <th class="text-left text-caption" style="border: none">SUNSET</th>
        </tr>
      </thead> -->
        <tbody>
          <tr v-for="(item, index) in instruments" :key="index">
            <td>{{ item.symbol }}</td>
            <td>{{ item.lastPrice }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "ListOfQuotes",
  props: {
    instruments: {
      type: Array,
      default: new Array(),
    },
  },
};
</script>

<style></style>
