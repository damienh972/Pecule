import { connect } from "react-redux";
import { closeDrizzleModal } from "../../actions/user";

import Modal from "../../views/Modal/Modal.js";

const mapStateToProps = (state) => ({
  isOpen: state.user.isDrizzleModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
  closeDrizzleModal: () => {
    dispatch(closeDrizzleModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
