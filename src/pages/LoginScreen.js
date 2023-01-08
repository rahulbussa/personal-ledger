/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES} from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import PinView from 'react-native-pin-view';
import {Button, IconButton} from 'react-native-paper';
import * as types from '../store/actions/types';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});
class LoginScreen extends React.Component {
  state = {
    dark: ['#434343', '#000000'],
    light: ['#00BA63', '#2BC978'],
    showPasscode: false,
    code: '',
    isBiometricSupported: false,
    isBiometricSet: false,
    showSnack: false,
    snackMessage: '',
  };
  pincodeInput = React.createRef();

  componentDidMount() {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;
      if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported');
        this.setState({isBiometricSupported: true});
      } else {
        this.setState({isBiometricSupported: false});
        console.log('Biometrics not supported');
      }
    });
    rnBiometrics.biometricKeysExist().then(resultObject => {
      const {keysExist} = resultObject;
      if (keysExist) {
        console.log('Keys exist');
        this.setState({isBiometricSet: true});
      } else {
        this.setState({isBiometricSet: false});
        console.log('Keys do not exist or were deleted');
      }
    });
  }

  handleAuth() {
    rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          console.log('successful biometrics provided');
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  }

  handleOnTextChange(pin) {
    console.log('in handleOnTextChange', pin);
    if (pin.length > 0) {
      this.setState({showRemoveButton: true});
    } else {
      this.setState({showRemoveButton: false});
    }

    if (pin.length === 4) {
      this.setState({showCompletedButton: true});
    } else {
      this.setState({showCompletedButton: false});
    }
    const previousPin = '1234';
    this.setState({pin});
    if (pin === previousPin) {
      console.log('pin not same');
      //   this.shakePincode();
      this.pincodeInput.current.clear();
      this.props.dispatch({
        type: types.LOGIN_SUCCESS
      });
      setTimeout(()=> {
        this.props.navigation.replace('Home');
      }, 800); 
    }
  }

  render() {
    const color =
      this.props.theme === 'dark' ? this.state.dark : this.state.light;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <LinearGradient colors={color} style={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {!this.state.showPasscode && (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <IconButton
                  onPress={() => this.handleAuth()}
                  icon="fingerprint"
                  iconColor={
                    this.props.theme === 'dark' ? COLORS.emerald : COLORS.white
                  }
                  size={60}
                />
                <View style={{...FONTS.body4}}>
                  <Button
                    mode="text"
                    style={{
                      color:
                        this.props.theme === 'dark'
                          ? COLORS.emerald
                          : COLORS.white,
                      fontSize: 10,
                    }}
                    onPress={() => this.setState({showPasscode: true})}>
                    Use Pin instead!
                  </Button>
                </View>
              </View>
            )}
            {this.state.showPasscode && (
              <View>
                <PinView
                  pinLength={4}
                  ref={this.pincodeInput}
                  onValueChange={value => this.handleOnTextChange(value)}
                  customLeftButton={
                    this.state.showRemoveButton ? (
                      <Icon name="backspace" size={36} color={'#FFF'} />
                    ) : undefined
                  }
                  customRightButton={
                    this.state.showCompletedButton ? (
                      <Icon name={'unlock'} size={36} color={'#FFF'} />
                    ) : undefined
                  }
                  onButtonPress={key => {
                    if (key === 'custom_left') {
                      this.pincodeInput.current.clear();
                    }
                    if (key === 'custom_right') {
                    }
                  }}
                />
              </View>
            )}
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.user,
  theme: state.app.theme,
});

export default connect(mapStateToProps)(LoginScreen);
