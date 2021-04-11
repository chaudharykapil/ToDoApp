import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const SnackBar = (props) => {

  return (
      <Snackbar
      style = {{position:"absolute",bottom:0}}
        visible={props.visible}
        action = {{
            label:"Dismiss",
            onPress:props.onDismissSnackBar
        }}

        onDismiss={props.onDismissSnackBar}>
        {props.message}
      </Snackbar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
export default SnackBar