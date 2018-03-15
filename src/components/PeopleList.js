import React, { Component }                        from 'react';
import { View, StyleSheet, ListView, Image } from 'react-native';
import { connect }                                       from 'react-redux';
import _                                                      from 'lodash';
import PeopleItem                                       from './PeopleItem';
import PeopleDetail                                     from './PeopleDetail';
import { loadInitialContacts }                        from '../actions';
import ic_contacts                                        from '../images/ic_contacts.png';
import { MKColor }                                        from 'react-native-material-kit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 20,
      backgroundColor: '#000',
  },
    icon: {
        width: 50,
        height: 50,
        color: MKColor.LightBlue,
    },
});

class PeopleList extends Component {
    static navigationOptions = () => ({
        tabBarIcon: ({ tintColor }) => (
            <Image source={ic_contacts} style={[ styles.icon, { tintColor: tintColor } ]}/>
        )
    });
    componentWillMount() {
      this.props.loadInitialContacts();
    }

  renderInitialView() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.people);

    if (this.props.detailView === true) {
      return (
        <PeopleDetail />
      );
    } else {
      return (
        <ListView 
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={(rowData) => 
            <PeopleItem people={rowData} />
          }
        />
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderInitialView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const people = _.map(state.people, (val, uid) => {
    return { ...val, uid};
  });

  return { 
    people,
    detailView: state.detailView,
 };
};

export default connect(mapStateToProps, { loadInitialContacts })(PeopleList);
