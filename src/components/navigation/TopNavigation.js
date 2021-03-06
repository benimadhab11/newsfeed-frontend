import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";  
import * as actions from "../../actions/auth";

const TopNavigation = ({ user, logout}) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>
     <Menu.Item as={Link} to="/bestitem">
      Best Items
    </Menu.Item>
   

    <Menu.Menu position="right">
      <Dropdown trigger={<Image avatar src="../../../logout.svg" />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
