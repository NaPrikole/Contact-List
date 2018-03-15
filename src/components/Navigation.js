import { TabNavigator, TabBarBottom } from 'react-navigation';
import PeopleList                                 from './PeopleList';
import FavouriteList                             from './FavouriteList';
import AddPerson                                 from './AddPerson';
import { MKColor }                                from 'react-native-material-kit';

const Navigation = TabNavigator({
    PeopleList: { screen: PeopleList },
    AddPerson: { screen: AddPerson },
    CompanyList: { screen: FavouriteList },
}, {
    tabBarOptions: {
        activeTintColor: MKColor.LightBlue,
        inactiveTintColor: MKColor.BlueGrey,
        swipeEnabled: true,
        showLabel: false,
        showIcon: true,
        tabBarPosition: TabBarBottom,
        style: {
            backgroundColor: '#222',
        },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
});

export default Navigation;