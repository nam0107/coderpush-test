export const TRANSACTION_LOG_EVENT = {
  CANCEL: 'ORDER_CANCEL',
  CANCEL_FROM_DMS: 'ORDER_CANCEL_FROM_DMS',
  RETURN: 'ORDER_RETURN',
  UPDATE_CSV: 'ORDER_UPDATE_OUTSTANDING_CSV',
  ORDER_DELIVERY_UPDATED: 'ORDER_DELIVERY_UPDATE_AMOUNT'
};

export const META_CONTENT = {
  ORDER_SVC_CANCEL: 'Order service cancels an order',
  ORDER_SVC_CANCEL_FROM_DMS: 'DMS cancels an order',
  ORDER_SVC_RETURN: 'Order service returns an order',
  ORDER_OUTSTANDING_CSV: 'Update by outstanding csv upload',
  ORDER_DELIVERY_UPDATED: 'Update amount when delivered'
};