import React, { Component }                                                                            from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { connect }                                                                                            from 'react-redux';
import { getTheme }                                                                                         from 'react-native-material-kit';
import EvilIcon                                                                                                 from 'react-native-vector-icons/EvilIcons';
import MaterialIcon                                                                                          from 'react-native-vector-icons/MaterialIcons';
import { MKColor }                                                                                           from 'react-native-material-kit';
import * as actions                                                                                           from '../actions';

const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginRight: 10,
    backgroundColor: MKColor.BlueGrey,
    paddingBottom: 20,
    marginBottom: 20,
    borderColor: MKColor.LightBlue,
    borderWidth: 2,
  },
  title1: {
      top: 10,
      left: 80,
      fontSize: 24,
      color: MKColor.LightBlue,
  },
  title2: {
      top: 35,
      left: 82,
      fontSize: 22,
      color: '#000',
      fontStyle: 'italic',
      fontWeight: '400',
  },
  image: {
      flex: 0,
      height: 100,
      width: '100%',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
  },
  closeIcon: {
      position: 'absolute',
      top: 0,
      right: 0,
      color: 'rgba(255,0,0,0.8)',
      backgroundColor: 'rgba(255,255,255,0)',
  },  
  icon: {
      position: 'absolute',
      top: 15,
      left: 0,
      color: MKColor.LightBlue,
      backgroundColor: 'rgba(255,255,255,0)',
  },
  textArea: {
      flexDirection: 'row',
      paddingLeft: 20,
      paddingTop: 10,
      width: 260,
  },
  textIcons: {
      color: '#222',
  },
  actionArea: {
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  editIcon: {
      color: MKColor.LightBlue,
  },
  sections: {
      flexDirection:  'row',
      paddingLeft: 10,
      paddingTop: 10,
      width: 100,
  },
  deleteIcon: {
      color: MKColor.LightBlue,
  },
  editDeleteArea: {
    flexDirection:  'row',
    paddingRight: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(211,211,211, 0.3)',
    marginBottom: 10,
  },
    iconTo: {
      flexDirection: 'row',
        justifyContent: 'space-between',
        width: 50,
        height:50,
    },
});

class DetailsView extends Component {
    handleClick = (link) => {
        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            } else {
                console.log('Don\'t know how to open URI: ' + link);
            }
        });
    };

    updateTest() {
        this.props.updateContact(this.props.person);
    }

    addToFavourite(){
        const { first_name, last_name, phone, email, company, project, notes } = this.props;

        this.props.createNewContact({ first_name, last_name, phone, email, company, project, notes });

        this.props.navigation.navigate('FavouriteList');
    }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[theme.cardStyle, styles.card]}>
        <Image 
            source={require('../images/ic_background.jpg')}
            style={[theme.cardImageStyle, styles.image]}
        />
        <EvilIcon name={'user'} size={100} style={styles.icon}/>
        <MaterialIcon name={'backspace'} size={30} style={styles.closeIcon}
              onPress={() => this.props.noneSelected()}
        />
        <Text style={[theme.cardTitleStyle, styles.title1]}>{this.props.person.first_name} {this.props.person.last_name}</Text> 
        <View style={styles.textArea}>
           <MaterialIcon name={'phone'} size={40} style={styles.textIcons}/>
           <Text style={theme.cardContentStyle}>{this.props.person.phone}</Text>
        </View>
        <View style={styles.textArea}>
           <MaterialIcon name={'email'} size={40} style={styles.textIcons}/>
           <Text style={theme.cardContentStyle}>{this.props.person.email}</Text>
        </View>
        <View style={styles.textArea}>
           <MaterialIcon name={'assignment'} size={40} style={styles.textIcons}/>
           <Text style={theme.cardContentStyle}>{this.props.person.project}</Text>
        </View>
        <View style={styles.textArea}>
           <MaterialIcon name={'mode-edit'} size={40} style={styles.textIcons}/>
           <Text style={theme.cardContentStyle}>{this.props.person.notes}</Text>
        </View>
        <View style={styles.editDeleteArea}>
            <TouchableOpacity style={styles.sections}
            onPress={() => {this.updateTest() }}>
               <MaterialIcon name={'autorenew'} size={40} style={styles.editIcon}/>
               <Text style={theme.cardContentStyle}>EDIT</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.sections}
                onPress={() => { this.props.deleteContact(this.props.person.uid)}}>
               <MaterialIcon name={'delete-forever'} size={40} style={styles.editIcon}/>
               <Text style={theme.cardContentStyle}>DEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sections}>
                  {/*onPress={() => { this.addToFavourite()}}*/}
                <MaterialIcon name={'favorite'} size={40} style={styles.editIcon}/>
                <Text style={theme.cardContentStyle}>FAV</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.actionArea}>
            <TouchableOpacity
                onPress={() => { this.handleClick(`tel:${this.props.person.phone}`)}}
            >
            <Image source={require('../images/ic_call.png')} style={styles.iconTo}/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { this.handleClick(`sms:${this.props.person.phone}`)}}
            >
                <Image source={require('../images/ic_sms.png')} style={styles.iconTo}/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { this.handleClick(`mailto:${this.props.person.email}`)}}
            >
                <Image source={require('../images/ic_email.png')} style={styles.iconTo}/>
            </TouchableOpacity>
        </View>
        <View style={styles.actionArea}>
            <Text>Call</Text>
            <Text>SMS</Text>
            <Text>Email</Text>
        </View>
        </View>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return { 
      person: state.personSelected,
      toUpdate: state.toUpdate,
   };
};

export default connect(mapStateToProps, actions)(DetailsView);