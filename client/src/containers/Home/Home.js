import { connect } from "react-redux";
import { openDrizzleModal } from "../../actions/user";

import Components from "../../views/Home/Home.js";

const mapStateToProps = (state) => ({
  isOpen: state.user.isDrizzleModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
  openDrizzleModal: () => {
    dispatch(openDrizzleModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Components);
