<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3">
        <ListOfInstruments
          :instruments="instruments"
          @selectInstrument="(s) => (symbol = s)"
        />
      </v-col>
      <v-col cols="12" md="7">
        <Trades :data="trade" />
      </v-col>
      <v-col cols="12" offset-sm="3" sm="6" offset-md="0" md="2">
        <CreateOrderForm :symbol="symbol" @submit="createOrder" />
      </v-col>
      <v-col cols="12">
        <OrdersHistory :data="order" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { api } from "./../api";
import { tables } from "./../config/tables";
import ListOfInstruments from "../components/ListOfInstruments.vue";
import Trades from "../components/Trades.vue";
import CreateOrderForm from "../components/CreateOrderForm.vue";
import OrdersHistory from "../components/OrdersHistory.vue";

export default {
  name: "Home",

  components: {
    ListOfInstruments,
    Trades,
    CreateOrderForm,
    OrdersHistory,
  },
  data() {
    return {
      instruments: [],
      symbol: "",
      order: [],
      trade: [],
      orderBook: [],
      quote: [],
    };
  },
  computed: {
    ...mapState({
      storeInstruments: "instruments",
      storeBucketed: "bucketed",
      storeOrders: "orders",
    }),
  },
  watch: {
    symbol(newSymbol, oldSymbol) {
      if (oldSymbol) {
        api.ws.unsubscribe(`${tables.trade}:${oldSymbol}`);
        api.ws.unsubscribe(`${tables.orderBook}:${oldSymbol}`);
        api.ws.unsubscribe(`${tables.quote}:${oldSymbol}`);
      }
      if (newSymbol) {
        api.ws.subscribe(`${tables.trade}:${newSymbol}`, this.refreashTrade);
        api.ws.subscribe(
          `${tables.orderBook}:${newSymbol}`,
          this.refreashOrderBook
        );
        api.ws.subscribe(`${tables.quote}:${newSymbol}`, this.refreashQuote);
      }
    },
  },
  methods: {
    ...mapActions({
      getInstruments: "GET_INSTRUMENTS",
      getBucketed: "GET_BUCKETED",
      getOrderS: "GET_ORDERS",
      createOrder: "POST_ORDERS",
    }),
    refreash(target, sourse, prop = "symbol") {
      if (sourse.action === "partial") {
        return sourse.data;
      }
      if (sourse.action === "insert") {
        return target.concat(sourse.data);
      }
      if (sourse.action === "update") {
        if (sourse.table === "quote") console.log("update", sourse);
        return target.map((item) => {
          const current = sourse.data.find((i) => item[prop] === i[prop]);
          if (!current) return item;
          return { ...item, ...current };
        });
      }
      if (sourse.action === "delete") {
        return target.filter(
          (item) => !sourse.data.find((i) => item[prop] === i[prop])
        );
      }
    },
    refreashInstruments(data) {
      this.instruments = this.refreash(this.instruments, data);
    },
    refreashOrder(data) {
      this.order = this.refreash(this.order, data, "orderID");
    },
    refreashTrade(data) {
      this.trade = this.refreash(this.trade, data, "trdMatchID");
    },
    refreashOrderBook(data) {
      this.orderBook = this.refreash(this.orderBook, data, "id");
    },
    refreashQuote(data) {
      this.quote = this.refreash(this.quote, data);
    },
  },
  async created() {
    await api.ws.authentication();

    api.ws.subscribe(tables.instrument, this.refreashInstruments);
    api.ws.subscribe(tables.order, this.refreashOrder);
    if (this.symbol) {
      api.ws.subscribe(`${tables.trade}:${this.symbol}`, this.refreashTrade);
      api.ws.subscribe(
        `${tables.orderBook}:${this.symbol}`,
        this.refreashOrderBook
      );
      api.ws.subscribe(`${tables.quote}:${this.symbol}`, this.refreashQuote);
    }
  },
  beforeDestroy() {
    api.ws.unsubscribe(tables.instrument);
    api.ws.unsubscribe(tables.order);
    if (this.symbol) {
      api.ws.unsubscribe(`${tables.trade}:${this.symbol}`);
      api.ws.unsubscribe(`${tables.orderBook}:${this.symbol}`);
      api.ws.unsubscribe(`${tables.quote}:${this.symbol}`);
    }
  },
};
</script>
