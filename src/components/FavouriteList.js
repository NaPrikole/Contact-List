import React, { Component }                        from 'react';
import { ListView, View, StyleSheet, Image } from 'react-native';
import ic_heart                                            from '../images/ic_heart.png';
import { MKColor }                                      from 'react-native-material-kit';
import PeopleItem                                      from './PeopleItem';
import { loadInitialContacts }                       from '../actions';
import { connect }                                       from 'react-redux';
import _                                                      from 'lodash';

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222',
    },
    title: {
        fontStyle: 'italic',
        fontSize: 22,
        fontWeight: 'bold',
        color: MKColor.LightBlue,
    }
});

class FavouriteList extends Component {
    static navigationOptions = () => ({
        tabBarIcon: ({ tintColor }) => (
            <Image source={ic_heart} style={[ styles.icon, { tintColor: tintColor } ]}/>
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
    };
};

export default connect(mapStateToProps, { loadInitialContacts })(FavouriteList);
