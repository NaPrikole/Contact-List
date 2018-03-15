import React                                                                                    from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { connect }                                                                            from 'react-redux';
import { getTheme }                                                                         from 'react-native-material-kit';
import { MKColor }                                                                           from 'react-native-material-kit';
import Icon                                                                                      from 'react-native-vector-icons/EvilIcons';
import * as actions                                                                           from '../actions';

const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
      marginRight: 20,
      borderWidth: 5,
      borderColor: MKColor.LightBlue,
      borderRadius: 8,
  },
  title: {
      top: 20,
      left: 80,
      fontSize: 24,
      color: MKColor.LightBlue,
  },
  image: {
      height: 100,
  },
  action: {
      backgroundColor: '#333',
      color: MKColor.LightBlue,
      borderTopColor: MKColor.LightBlue,
      borderTopWidth: 1,
  },
  icon: {
      position: 'absolute',
      top: 15,
      left: 0,
      color: MKColor.LightBlue,
      backgroundColor: 'rgba(255,255,255,0)',
  },
});

class PeopleItem extends React.Component  {
    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.selectPerson(this.props.people)}
            >
                <View style={[theme.cardStyle, styles.card]}>
                    <Image
                        source={require('../images/ic_background.jpg')}
                        style={[theme.cardImageStyle, styles.image]}
                    />
                    <Icon
                        name={'user'}
                        size={100}
                        style={styles.icon}
                    />
                    <Text
                        style={[theme.cardTitleStyle, styles.title]}>{this.props.people.first_name} {this.props.people.last_name}</Text>
                    <Text style={[theme.cardActionStyle, styles.action]}>{this.props.people.company}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default connect(null, actions)(PeopleItem);