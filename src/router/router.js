import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Splash, 
        Beranda, RencanaMenanam, RencanaPerawatan, Notifikasi,
        Menanam, DetailMenanam, RunDetailMenanam, QuizMenanam,
        Perawatan, DetailPerawatan, RunDetailPerawatan, QuizPerawatan,
        MasukAkun, DaftarAkun,
        Profil, EditAkun, BantuanAkun, RiwayatMenanam, RiwayatPerawatan, MenuAkun, HapusAkun,
        SimpananMenanam, SimpananMerawat,
      } from '../pages/pages.js'
import { BottomNavigation} from '../components/components.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//untuk tab navigation
const MainApp = ({ route }) => {
    const { keyUser } = route.params;
    
    return (
        <Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
            <Tab.Screen name="Beranda" component={Beranda} initialParams={{ keyUserLogin: keyUser}}/>
            <Tab.Screen name="Menanam" component={Menanam} initialParams={{ keyUserLogin: keyUser}}/>
            <Tab.Screen name="Merawat" component={Perawatan} initialParams={{ keyUserLogin: keyUser}}/>
            <Tab.Screen name="Profil" component={Profil} initialParams={{ keyUserLogin: keyUser}}/>
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
            <Stack.Screen name="MasukAkun" component={MasukAkun} options={{headerShown: false}}/>
            <Stack.Screen name="DaftarAkun" component={DaftarAkun} options={{headerShown: false}}/>
            <Stack.Screen name="MainApp" component={MainApp} options={{headerShown: false}}/>
            <Stack.Screen name="DetailMenanam" component={DetailMenanam} options={{headerShown: false}}/>
            <Stack.Screen name="RunDetailMenanam" component={RunDetailMenanam} options={{headerShown: false}}/>
            <Stack.Screen name="QuizMenanam" component={QuizMenanam} options={{headerShown: false}}/>
            <Stack.Screen name="DetailPerawatan" component={DetailPerawatan} options={{headerShown: false}}/>
            <Stack.Screen name="RunDetailPerawatan" component={RunDetailPerawatan} options={{headerShown: false}}/>
            <Stack.Screen name="QuizPerawatan" component={QuizPerawatan} options={{headerShown: false}}/>
            <Stack.Screen name="SimpananMenanam" component={SimpananMenanam} options={{headerShown: false}}/>
            <Stack.Screen name="SimpananMerawat" component={SimpananMerawat} options={{headerShown: false}}/>
            <Stack.Screen name="RencanaMenanam" component={RencanaMenanam} options={{headerShown: false}}/>
            <Stack.Screen name="RencanaPerawatan" component={RencanaPerawatan} options={{headerShown: false}}/>
            <Stack.Screen name="Notifikasi" component={Notifikasi} options={{headerShown: false}}/>
            <Stack.Screen name="EditAkun" component={EditAkun} options={{headerShown: false}}/>
            <Stack.Screen name="BantuanAkun" component={BantuanAkun} options={{headerShown: false}}/>
            <Stack.Screen name="RiwayatMenanam" component={RiwayatMenanam} options={{headerShown: false}}/>
            <Stack.Screen name="RiwayatPerawatan" component={RiwayatPerawatan} options={{headerShown: false}}/>
            <Stack.Screen name="MenuAkun" component={MenuAkun} options={{headerShown: false}}/>
            <Stack.Screen name="HapusAkun" component={HapusAkun} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default Router;
