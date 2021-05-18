export const CREATE_ASSET = "CREATE_ASSET";
export const OPEN_SALES = "OPEN_SALES";

export const createAsset = (
  name,
  totalSupply,
  yearROI,
  estatePrice,
  tokenPrice
) => ({
  type: CREATE_ASSET,
  name,
  totalSupply,
  yearROI,
  estatePrice,
  tokenPrice,
});
export const openSales = () => ({
  type: OPEN_SALES,
});
