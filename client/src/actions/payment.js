export const PAY_WITH_MM = "PAY_WITH_MM";

export const payWithMM = (productId) => ({
  type: PAY_WITH_MM,
  productId,
});
