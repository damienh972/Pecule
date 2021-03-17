import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Search from "@material-ui/icons/Search";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);
export default function SearchBar(props) {
  return (
    <CustomInput
      labelText="Search"
      id="material"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
      style={{
        color: "inherit",
      }}
    />
  );
}
