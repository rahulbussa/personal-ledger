import React from "react";
import { View, KeyboardAvoidingView,ScrollView, StatusBar  } from "react-native";
import { Button, Text, TextInput, Snackbar } from "react-native-paper";
import { connect } from "react-redux";
import { COLORS, FONTS, SIZES } from  '../constants/theme';
import { StackActions } from "@react-navigation/native";
import * as types from '../store/actions/types';
import {addTransaction} from '../store/actions/appActions';


class Add extends React.Component {
    state = { amount:0, desc:'', showSnack: false, snackDescription:'' }

    addIncome() {
        const transaction = {
            amount: this.state.amount,
            description: this.state.desc
        };
        if (!this.state.amount || !this.state.desc) {
            this.setState({snackDescription: 'Please enter amount and Description', showSnack: true});
            return;
        }
        
        this.props.addTransaction(transaction);
        this.setState({showSnack:true, snackDescription: 'Transaction added Successfully!!'});
        setTimeout(()=>{
            this.props.navigation.goBack();
        },300);

    }

    onDismissSnackBar(){
        this.setState({showSnack:false, snackDescription:''});
    }

    render() {
        return (
            <KeyboardAvoidingView style={{flex:1}}>
                <StatusBar></StatusBar>
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <View style={{marginVertical: 20, marginHorizontal: 20}}>
                        <View style={{justifyContent:'center', alignItems:'center', flex:1, paddingVertical: SIZES.padding, marginBottom: SIZES.padding2*3}}>
                            <Text style={{...FONTS.h2}}>Add Income</Text>
                        </View>
                        <View style={{flexDirection:'column'}}>
                            <TextInput
                                label="Amount"
                                keyboardType='numeric'
                                value={this.state.amount}
                                style={{
                                    marginBottom: SIZES.padding2*2,
                                    color: COLORS.black
                                }}
                                onChange={amt => this.setState({amount:amt})}
                            />
                            <TextInput
                                label="Description"
                                value={this.state.desc}
                                style={{
                                    marginBottom: SIZES.padding2*2,
                                    color: COLORS.black
                                }}
                                onChange={desc => this.setState({desc})}
                            />
                            <Button mode="contained" onPress={() => this.addIncome()}>
                                Add Income
                            </Button>
                        </View>
                    </View>
                    <Snackbar
                        visible={this.state.showSnack}
                        onDismiss={this.onDismissSnackBar}
                        action={{
                        label: 'Undo',
                        onPress: () => {
                            // Do something
                        },
                        }}>
                        {this.state.snackDescription}
                    </Snackbar>
                </ScrollView>  
            </KeyboardAvoidingView>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    transaction: state.transactions
});

const mapDispatchToProps = {
    addTransaction
};

export default connect(mapStateToProps,mapDispatchToProps)(Add);