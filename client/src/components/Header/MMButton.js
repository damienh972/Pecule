import PropTypes from "prop-types";
import React, { useState } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

import MMIcon from "../../assets/img/icons/metamask.ico";
import ETHIcon from "../../assets/img/icons/logo_connected.svg";
import MenuList from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function MMButton(props) {
  const classes = useStyles();
  console.log(props);

  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
      console.log("open");
      document.body.style.overflowY = "hidden";
    }
  }

  function handleClose() {
    console.log("close");
    document.body.style.overflowY = "scroll";
    setAnchorEl(null);
  }
  return (
    <List
      className={classes.list}
      style={{
        display: "flex",
      }}
    >
      {props.infoMessage && props.infoMessage === "Connected" && (
        <ListItem className={classes.listItem}>
          <Button
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            //onClick={handleClick}
            onMouseOver={handleClick}
            color="transparent"
            className={classes.navLink}
            style={{
              minWidth: "8em",
              fontSize: "1em",
              justifyContent: "center",
              padding: "0.5em 0.5em",
              // backgroundColor: "#212121",
              textTransform: "none",
            }}
            simple
            size="lg"
          >
            <img
              src={ETHIcon}
              alt="ethereum icon"
              style={{
                width: "25px",
                height: "25px",
                marginRight: "0.2em",
                // boxShadow: "",
                marginBottom: "0.2em",
              }}
            />
            {props.infoMessage}
          </Button>
          <MenuList
            id="simple-menu"
            anchorEl={anchorEl}
            anchorPosition={{ top: 400, left: 200 }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
            style={{
              marginTop: "2.5em",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Sell artwork</MenuItem>
          </MenuList>
        </ListItem>
      )}
      <ListItem className={classes.listItem}>
        <Tooltip
          id="MMConnexion"
          title="login with metamask"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            style={{
              minWidth: "8em",

              fontSize: "1em",
              display: `${props.display}`,
              justifyContent: "center",
              padding: "0.5em 0.5em",
              // backgroundColor: "#212121",
              textTransform: "none",
            }}
            //simple
            disabled={props.isDisabled}
            size="lg"
            onClick={props.connectToMM}
          >
            <img
              style={{
                width: "2em",
                marginRight: "10px",
              }}
              src={MMIcon}
              alt="metamask icon"
            />

            <h4>Login</h4>
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

MMButton.propTypes = {
  connectToMM: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired,
  infoMessage: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
