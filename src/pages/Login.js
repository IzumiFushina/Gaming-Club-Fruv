import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function Login() {
  return (
    <View>
    <Text style={styles.TextoEmail}>E-mail Address</Text>
        <TextInput
          style={styles.InputName}
          placeholder="E-mail"
          keyboardType="email-address"
        />
        <Text style={styles.TextoEmail}>Password</Text>
        <TextInput
          style={styles.InputName}
          placeholder="Senha"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.ButtonContainer}>
          <Text style={styles.ButtonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.TextoOr}>Or</Text>

        <View style={styles.SignUpContainer}>
          <Text style={styles.TextoEmail2}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.SignUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
     </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});