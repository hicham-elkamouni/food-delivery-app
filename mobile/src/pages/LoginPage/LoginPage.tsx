import { View, StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";

export const LoginPage = () => {
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerHeader: {},
  message: {},
});
