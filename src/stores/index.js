import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: []
  }),
  actions: {
    addOrder(order) {
      this.orders.push(order)
    },
    removeOrder(orderId) {
      this.orders = this.orders.filter(order => order.name !== orderId)
    },
    getTotalPrice() {
      //  return this.orders.reduce((total, order) => total + order.price, 0)
      // return this.orders.reduce((total, order) => total + parseInt(order.price), 0)
       // return this.orders.reduce((total, order) => total + parseFloat(order.price), 0)
     // return this.orders.reduce((total, order) => total + parseFloat(order.price.replace('Rp',"")), 0)
   return this.orders.reduce((total, order) => total + parseFloat(order.price.replace('Rp', '').replace('.', '')), 0)
   
    },
    increaseQuantity(id) {
      const order = this.orders.find(order => order.id === id)
      if (order) {
        order.quantity++
      }
    },
    decreaseQuantity(id) {
      const order = this.orders.find(order => order.id === id)
      if (order && order.quantity > 1) {
        order.quantity--
      }
    },
    
    updateOrder(order) {
      const index = this.orders.findIndex(o => o.id === order.id)
      if (index !== -1) {
        this.orders[index] = order
      }
    },

    getOrder(id) {
      return this.orders.find(order => order.id === id)
    },

    updateItemQuantity(item) {
      const order = this.orders.find(order => order.name === item.product.name)
      if (order) {
        order.quantity = item.quantity
      }
    },

    clearOrders() {
      this.orders = []
    }
    
  }
})
