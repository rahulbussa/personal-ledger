import React from "react";
import { Text,SafeAreaView, View, StatusBar, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from  '../constants/theme';
// import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Badge, Button, Divider, Menu } from 'react-native-paper';
import { Avatar, Card, IconButton } from 'react-native-paper';
// import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import { FAB, Portal, Provider } from 'react-native-paper';
import Categories from "../components/Categories";
import * as types from "../store/actions/types";
// import {logoutSuccessAction} from '../store/actions/appActions';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false, showmenu: false,}
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        console.log("component did mount",this.props);
    }

    onStateChange(event) {
        console.log("in state change",event);
        this.setState({open: event.open});
    }

    openMenu(){
        this.setState({showmenu: true});
    }

    closeMenu(){
        this.setState({showmenu: false});
    }

    logout() {
        console.log("in logout function");
        console.log(this.props);
        this.props.dispatch({type: types.LOGOUT_SUCCESS});
        // this.props.logoutaction();
        this.props.navigation.replace('Login')
    }

    render() {
        return (
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.white, padding: SIZES.padding}}>
            <StatusBar></StatusBar>
            
                <ScrollView>
                    <View style={{marginHorizontal: 20}}>
                        <View style={{marginVertical: 40}}>
                            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                    <Menu
                                        visible={this.state.showmenu}
                                        onDismiss={this.closeMenu}
                                        anchor={
                                        <IconButton icon="dots-vertical" size={24} iconColor={COLORS.darkGreen} onPress={this.openMenu} />
                                        }
                                        >
                                        <Menu.Item onPress={this.logout} title="Logout" />
                                    </Menu>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                                <View style={{flex:1}}>
                                    <Text style={{...FONTS.h2}}>Hello!</Text>
                                    <Text style={{...FONTS.body2, color: COLORS.grey}}> Rahul Bussa</Text>
                                </View>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Avatar.Image size={54} source={require('../../assets/images/rahulbussa.jpeg')} />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', paddingTop: SIZES.padding, justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{...FONTS.body2}}> January </Text>
                                <TouchableOpacity 
                                        style={{ height: 40, width: 40, justifyContent:'center', alignItems: 'center', backgroundColor: COLORS.lightGrey }}>
                                    <Icon name="chart-pie" size={16} color={COLORS.darkGrey}/>
                                </TouchableOpacity>
                            </View>

                            <View style={{flexDirection: 'row',flex:1, paddingTop: SIZES.padding, justifyContent: 'space-between', alignItems: 'center'}}>
                                <View style={{backgroundColor: COLORS.green, color: COLORS.white, paddingHorizontal: SIZES.padding*2, paddingVertical:SIZES.padding, borderRadius:6}}>
                                    <Text style={{color: COLORS.white, fontFamily: 'InterMedium'}}>Income</Text>
                                    <View style={{flexDirection: 'row', justifyContent:'center', alignContent: 'center'}}>
                                        <View>
                                            <Icon name="rupee-sign" size={16} color={COLORS.white} style={{position: 'relative', top: 2, paddingRight: 8}}  />
                                        </View>
                                        <Text style={{color: COLORS.white}}>20</Text>
                                    </View>
                                </View>
                                <View style={{backgroundColor: COLORS.yellow, color: COLORS.white, paddingHorizontal: SIZES.padding*2, paddingVertical:SIZES.padding, borderRadius:6}}>
                                    <Text style={{color: COLORS.white, fontFamily: 'InterMedium'}} >Expense</Text>
                                    <View style={{flexDirection: 'row', justifyContent:'center', alignContent: 'center'}}>
                                        <View>
                                            <Icon name="rupee-sign" size={16} color={COLORS.red} style={{position: 'relative', top: 2, paddingRight: 8}}  />
                                        </View>
                                        <Text style={{color: COLORS.red}} >20</Text>
                                    </View>
                                </View>
                                <View style={{backgroundColor: COLORS.grey, color: COLORS.white, paddingHorizontal: SIZES.padding*2, paddingVertical:SIZES.padding, borderRadius:6}}>
                                    <Text style={{color: COLORS.white, fontFamily: 'InterMedium'}}>Balance</Text>
                                    <View style={{flexDirection: 'row', justifyContent:'center', alignContent: 'center'}}>
                                        <View>
                                            <Icon name="rupee-sign" size={16} color={COLORS.black} style={{position: 'relative', top: 2, paddingRight: 8}}  />
                                        </View>
                                        <Text>20</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Categories />
                    </View>
                </ScrollView>
                <Portal>
                <FAB.Group
                    open={this.state.open}
                    visible
                    fabStyle={{backgroundColor: COLORS.emerald, borderRadius: 50, color: COLORS.white}}
                    icon={this.state.open ? 'minus' : 'plus'}
                    actions={[
                        { icon: 'plus', onPress: () => console.log('Pressed add') },
                        {
                            icon: 'cash-plus',
                            label: 'Add Income',
                            onPress: () => {this.props.navigation.navigate('Add')},
                          },
                          {
                            icon: 'cash-minus',
                            label: 'Add Expense',
                            onPress: () => console.log('Pressed email'),
                          },
                        ]}
                        onStateChange={(event) => this.onStateChange(event)}
                        onPress={() => {
                            if (this.state.open) {
                            // do something if the speed dial is open
                            }
                    }}
                    />    
            </Portal>
        </SafeAreaView>
        )
    }

}

const mapStateToProps = (state) => ({
    user: state.user,
    transaction: state.transactions
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);