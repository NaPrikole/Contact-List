import React, { Component }                                   from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { MKTextField, MKColor, MKButton}            from 'react-native-material-kit';
import { connect }                                                  from 'react-redux';
import * as actions                                                 from '../actions';
import ic_add                                                         from '../images/ic_add.png'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
    },
  form: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
      backgroundColor: '#222',
  },
  fieldStyles: {
    height: 40,
    color: MKColor.LightBlue,
  },
  addButton:{
    marginTop: 20,
  },
    icon: {
      width: 30,
        height: 30,
        color: MKColor.LightBlue,
    },
    add: {
        color: MKColor.LightBlue,
        fontStyle: 'italic',
        fontSize: 24,
    }
});

const AddButton = MKButton.coloredButton()
    .withTextStyle({
        color: MKColor.LightBlue,
        fontWeight: 'bold',
    })
    .withText('ADD Contact')
    .build();

class AddPerson extends Component {
    static navigationOptions = () => ({
        tabBarIcon: ({ tintColor }) => (
            <Image source={ic_add} style={[ styles.icon, { tintColor: tintColor } ]}/>
        )
    });
    onAddPress() {
      const { first_name, last_name, phone, email, company, project, notes } = this.props;

      this.props.createNewContact({ first_name, last_name, phone, email, company, project, notes });

      this.props.navigation.navigate('PeopleList');
    }
  render() {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.form}>
              <Text style={styles.add}>Add a new contact</Text>
              <MKTextField
                textInputStyle={styles.fieldStyles}
                placeholderTextColor={MKColor.LightBlue}
                placeholder={'First name...'}
                tintColor={MKColor.LightBlue}
                value={this.props.first_name}
                onChangeText={value => this.props.formUpdate({ prop: 'first_name', value})}
              />
              <MKTextField
                textInputStyle={styles.fieldStyles}
                placeholderTextColor={MKColor.LightBlue}
                placeholder={'Last name...'}
                tintColor={MKColor.LightBlue}
                value={this.props.last_name}
                onChangeText={value => this.props.formUpdate({ prop: 'last_name', value})}
              />
              <MKTextField
                textInputStyle={styles.fieldStyles}
                placeholderTextColor={MKColor.LightBlue}
                placeholder={'Phone number...'}
                tintColor={MKColor.LightBlue}
                value={this.props.phone}
                onChangeText={value => this.props.formUpdate({ prop: 'phone', value})}
              />
              <MKTextField
                textInputStyle={styles.fieldStyles}
                placeholderTextColor={MKColor.LightBlue}
                placeholder={'Email...'}
                tintColor={MKColor.LightBlue}
                value={this.props.email}
                onChangeText={value => this.props.formUpdate({ prop: 'email', value})}
              />
              <MKTextField
                textInputStyle={styles.fieldStyles}
                placeholderTextColor={MKColor.LightBlue}
                placeholder={'Company...'}
                tintColor={MKColor.LightBlue}
                value={this.props.company}
                onChangeText={value => this.props.formUpdate({ prop: 'company', value})}
              />
              <MKTextField
                textInputStyle={styles.fieldStyles}
                placeholderTextColor={MKColor.LightBlue}
                placeholder={'Programming languages...'}
                tintColor={MKColor.LightBlue}
                value={this.props.project}
                onChangeText={value => this.props.formUpdate({ prop: 'project', value})}
              />
              <MKTextField
                textInputStyle={styles.fieldStyles}
                placeholderTextColor={MKColor.LightBlue}
                placeholder={'Notes...'}
                tintColor={MKColor.LightBlue}
                value={this.props.notes}
                onChangeText={value => this.props.formUpdate({ prop: 'notes', value})}
              />
              <View style={styles.addButton}>
                <AddButton onPress={this.onAddPress.bind(this)}/>
              </View>
            </View>
            </ScrollView>
        </View>
    );
  }
}

const mapStateToProps = state => {
  const { first_name, last_name, phone, email, company, project, notes } = state;
  return { first_name, last_name, phone, email, company, project, notes };

};

export default connect(mapStateToProps, actions)(AddPerson);