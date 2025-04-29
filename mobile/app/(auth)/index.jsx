import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import COLORS from '../../constants/colors'
import { useRouter } from 'expo-router'
import styles from '../../assets/styles/login.styles'
import { useAuthStore } from '../../store/authStore'

export default function Login() {
  const { login } = useAuthStore();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const router = useRouter();

  const handleLogin = async () => {
    const result = await login(email, password)
    if (!result.success) Alert.alert('Error', result.error);
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assets/images/authBackground.png')}
          style={styles.illustrationImage} resizeMode="contain"
        />
        <View style={styles.card}>
          <View style={styles.formContainer}>
            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20}
                  color={COLORS.primary}
                />
                <TextInput style={styles.input}
                  placeholder='Email'
                  keyboardType='email-address'
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20}
                  color={COLORS.primary}
                />
                <TextInput style={styles.input}
                  placeholder='Password'
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  maxLength={13}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons
                    name={!isPasswordVisible ?
                      "eye" : "eye-outline"}
                    size={18} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
            {/* Buttom */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have any account</Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text style={styles.link}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}