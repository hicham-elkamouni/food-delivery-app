import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage, LoginPage } from "../pages";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
