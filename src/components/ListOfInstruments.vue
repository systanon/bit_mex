<template>
  <v-card outlined>
    <h2 class="text-center py-4">Instruments</h2>
    <v-simple-table v-if="instruments.length" dense height="60vh">
      <template v-slot:default>
        <tbody>
          <tr
            v-for="(item, index) in instruments"
            :key="index"
            :class="{ primary: index === activeIndex }"
            @click="
              $emit('selectInstrument', item.symbol);
              activeIndex = index;
            "
          >
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
  name: "ListOfInstruments",
  props: {
    instruments: {
      type: Array,
      default: new Array(),
    },
  },
  data() {
    return {
      activeIndex: null,
    };
  },
};
</script>

<style></style>
