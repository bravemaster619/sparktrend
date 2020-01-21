const OrderStatus = {
   SHOUTOUT: {
      NOT_CREATED: 0,
      CREATED: 1,
      ACCEPTED: 2,
      STARTED: 3,
      EXPIRED: 4,
      COMPLETED: 5,
      REJECTED: -1
   },
   PAYMENT: {
      NOT_PAID: 0,
      PAID: 1,
      REFUNDED: -1
   }
}

getOrderStatus = (order) => {
   let status = {
      shoutout: OrderStatus.SHOUTOUT.NOT_CREATED,
      payment: OrderStatus.PAYMENT.NOT_PAID
   }
   if (!(order.history)) {
      return status;
   }
   if (order.history.paid_at) {
      status.payment = OrderStatus.PAYMENT.PAID;
   }
   if (order.history.refunded_at) {
      status.payment = OrderStatus.PAYMENT.REFUNDED;
   }
   if (order.history.created_at) {
      status.shoutout = OrderStatus.SHOUTOUT.CREATED;
   }
   if (order.history.accepted_at) {
      status.shoutout = OrderStatus.SHOUTOUT.ACCEPTED;
   }
   if (order.history.started_at) {
      status.shoutout = OrderStatus.SHOUTOUT.STARTED;
   }
   if (order.history.expired_at) {
      status.shoutout = OrderStatus.SHOUTOUT.EXPIRED;
   }
   if (order.history.completed_at) {
      status.shoutout = OrderStatus.SHOUTOUT.COMPLETED;
   }
   if (order.history.rejected_at) {
      status.shoutout = OrderStatus.SHOUTOUT.REJECTED;
   }
   return status
}

getOrderShoutoutStatus = (order) => {
   return getOrderStatus(order).shoutout
}

getOrderPaymentStatus = (order) => {
   return getOrderStatus(order).payment
}

module.exports = {
   OrderStatus,
   getOrderStatus,
   getOrderShoutoutStatus,
   getOrderPaymentStatus
}