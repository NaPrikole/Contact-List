import React, { Component }                        from 'react';
import { StyleSheet, Text, View, Image }       from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Loader                                              from './Loader';
import firebase                                             from 'firebase';

const LoginButton = MKButton.coloredButton()
    .withTextStyle({
        color: MKColor.LightBlue,
        fontWeight: 'bold',
    })
    .withText('LOGIN')
    .build();

const styles = StyleSheet.create({
    form: {
        paddingBottom: 10,
        width: 200,
    },
    fieldStyles: {
        height: 40,
        color: MKColor.LightBlue,
        width: 200,
        fontSize: 18,
    },
    loginButton: {
        marginTop: 20,
        color: MKColor.LightBlue,
    },
    container: {
    flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },
    errorMessage: {
        marginTop: 15,
        fontSize: 18,
        color: 'red',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    notice: {
        color: MKColor.LightBlue,
        fontStyle: 'italic',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        marginBottom: 40,
    }
});

export default class Login extends Component {
  state = {
      email: '',
      password: '',
      error: '',
      loading: false,
  };

  onButtonPress() {
      const { email, password } = this.state;
      this.setState({error: '', loading: true});

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onAuthSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onAuthSuccess.bind(this))
                .catch(this.onAuthFailed.bind(this));
        });
  }

  onAuthSuccess() {
      this.setState({
        email: '',
        password: '',
        error: '',
        loading: false, 
      });
  }

onAuthFailed() {
    this.setState({
        error: 'Authentication Failed',
        loading: false,
    });
}

  renderLoader() {
    if (this.state.loading) {
        return <Loader size="large"/>;
    } else {
        return <LoginButton onPress={this.onButtonPress.bind(this)} />
    }
  }

  render() {
    const { form, fieldStyles, loginButton, errorMessage,  container, title, notice } = styles;
    return (
        <View style={container}>
            <View style={title}>
                <Image source={require('../images/ic_title.png')} />
            </View>
            <View style={form}>
            <Text style={notice}>Login or create an account</Text>
            <MKTextField
                text={this.state.email}
                onTextChange={email => this.setState({ email })}
                textInputStyle={fieldStyles}
                placeholder={'Email...'}
                placeholderTextColor={MKColor.LightBlue}
                tintColor={MKColor.LightBlue}
            />
            <MKTextField
                text={this.state.password}
                onTextChange={password => this.setState({ password })}
                textInputStyle={fieldStyles}
                placeholder={'Password...'}
                placeholderTextColor={MKColor.LightBlue}
                tintColor={MKColor.LightBlue}
                password={true}
            />
            <Text style={errorMessage}>
                {this.state.error}
            </Text>
            <View style={loginButton}>
                {this.renderLoader()}
            </View>
            </View>
        </View>
    );
  }
}
