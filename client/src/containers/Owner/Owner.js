import { connect } from "react-redux";
import { createAsset, openSales } from "../../actions/owner";

import Owner from "../../views/Owner/Owner.js";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  createAsset: (name, totalSupply, yearROI, estatePrice, tokenPrice) => {
    dispatch(createAsset(name, totalSupply, yearROI, estatePrice, tokenPrice));
  },
  openSales: () => {
    dispatch(openSales());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
