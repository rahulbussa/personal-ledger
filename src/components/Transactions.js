import React from "react";
import { Text, View } from "react-native";

class Transactions extends React.Component {
    state = {  }

    render() {
        return (
            <View>
                <Text>Transactions</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user,
  });

export default connect(mapStateToProps, {})(Transactions);