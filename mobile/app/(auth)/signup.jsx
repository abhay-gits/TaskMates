import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import { useRouter } from 'expo-router'

import styles from '../../assets/styles/login.styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import COLORS from '../../constants/colors'
import { useAuthStore } from '../../store/authStore.js'

export default function Signup() {

  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const { register } = useAuthStore();

  const router = useRouter();

  const handleRegister = async () => {
    const result = await register(username, email, password);

    if (!result.success) Alert.alert('Error', result.error);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topIllustration}>
        <Image source={require('../../assets/images/authBackground.png')}
          style={{
            width: 200,
            height: 200,
          }} resizeMode="contain"
        />
        <View style={styles.card}>
          <View style={styles.formContainer}>
            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20}
                  color={COLORS.primary}
                />
                <TextInput style={styles.input}
                  placeholder='Username'
                  keyboardType='default'
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>
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
            {/* Button */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have any account</Text>
              <TouchableOpacity onPress={() => router.push('/(auth)')}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}