// import React from "react";
import React, { useContext}from "react";
import { createDrawerNavigator ,DrawerContentScrollView,  DrawerItemList,  DrawerItem,} from "@react-navigation/drawer";
import HomeScreen from '../Screen/NavScreen/HomeScreen';
import { AuthContext } from '../Components/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';

function CustomDrawerContent(props) {

  

  const { signOut } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="LogOut"
        onPress={() => signOut()}
      />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;