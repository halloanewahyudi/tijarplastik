import { defineStore } from "pinia";

export const useOrder = defineStore('orderan', {
    state: () => {
        return {
            orders: [],
            getOrders: []
        }
    },
    actions: {
        addOrder(order){
            this.orders.push(order);
        },
        removeOrder(index){
           this.orders = this.orders.filter(order => order.id !== index);
        },

          getTotalPrice() {
            //  return this.orders.reduce((total, order) => total + order.price, 0)
            // return this.orders.reduce((total, order) => total + parseInt(order.price), 0)
             // return this.orders.reduce((total, order) => total + parseFloat(order.price), 0)
           // return this.orders.reduce((total, order) => total + parseFloat(order.price.replace('Rp',"")), 0)
        return this.orders.reduce((total, order) => total + parseFloat(order.price.replace('Rp', '').replace('.', '')), 0)
         
          },

        viewOrder(index){
            return this.orders[index];
        },
        editOrder(index, order){
            this.orders[index] = order;
            console.log(order)
        },
        clearOrder(){
            this.orders = [];
        }
    }
})