export const CREATE_ASSET = "CREATE_ASSET";

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
