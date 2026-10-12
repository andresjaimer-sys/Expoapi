
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Lista from './src/componentes/lista';
import Pokemon from './src/componentes/pokemon';
import Favoritos from './src/componentes/favoritos';
import Informativa from './src/componentes/informativa';
import Usuario from './src/componentes/usuario';
import Capturados from './src/componentes/capturados';

import { AppProvider } from './src/context/AppContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ListaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaInicio"
        component={Lista}
        options={{ title: 'Lista Pokémon' }}
      />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{ title: 'Detalle Pokémon' }}
      />
    </Stack.Navigator>
  );
}

function FavoritosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritosInicio"
        component={Favoritos}
        options={{ title: 'Favoritos' }}
      />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{ title: 'Detalle Pokémon' }}
      />
    </Stack.Navigator>
  );
}

function CapturadosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CapturadosInicio"
        component={Capturados}
        options={{ title: 'Capturados' }}
      />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{ title: 'Detalle Pokémon' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Lista"
            component={ListaStack}
          />

          <Tab.Screen
            name="Informativa"
            component={Informativa}
          />

          <Tab.Screen
            name="Capturados"
            component={CapturadosStack}
          />

          <Tab.Screen
            name="Favoritos"
            component={FavoritosStack}
          />

          <Tab.Screen
            name="Usuario"
            component={Usuario}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
