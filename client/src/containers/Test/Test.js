import { connect } from "react-redux";
import { payWithMM } from "../../actions/payment.js";

import Test from "../../views/Test/Test.js";

const mapStateToProps = (state) => ({
 
});

const mapDispatchToProps = (dispatch) => ({
  payWithMM: (productId) => {
    dispatch(payWithMM(productId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
