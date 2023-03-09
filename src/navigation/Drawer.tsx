import { createDrawerNavigator } from '@react-navigation/drawer';
import About from '../pages/Drawer/About';
import Appointments from '../pages/Drawer/Appointments';
import Contractors from '../pages/Drawer/Contractors';
import Expenses from '../pages/Drawer/Products';
import Profile from '../pages/Drawer/Profile';

import BottomTabs from './BottomTabs';
import CustomDrawer from './CustomDrawer';
import SettingStack from '../pages/Setting/Stack'

const Drawer = createDrawerNavigator();

function MyDrawer() {

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: false, drawerPosition: 'right', }}>
            <Drawer.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false, unmountOnBlur: true, }} />
            <Drawer.Screen name="profile" component={Profile} options={{ headerShown: false, unmountOnBlur: true, }} />
            <Drawer.Screen name="appointments" component={Appointments} options={{ headerShown: false, }} />
            <Drawer.Screen name="contractors" component={Contractors} options={{ headerShown: false, unmountOnBlur: true, }} />
            <Drawer.Screen name="expenses" component={Expenses} options={{ headerShown: false, unmountOnBlur: true, }} />
            <Drawer.Screen name="about" component={About} options={{ headerShown: false, unmountOnBlur: true, }} />
            <Drawer.Screen name="settingStack" component={SettingStack} options={{ headerShown: false, unmountOnBlur: true, }} />
        </Drawer.Navigator>
    )
}

export default MyDrawer;