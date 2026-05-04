import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  useSharedValue, 
  withSpring, 
  withSequence, 
  withTiming 
} from 'react-native-reanimated';
import { useAuth } from '../../context/AuthContext';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const { height } = Dimensions.get('window');

const roles = [
  { label: 'Farmer', value: 'farmer', emoji: '🌾' },
  { label: 'Driver', value: 'driver', emoji: '🚜' },
  { label: 'Customer', value: 'customer', emoji: '🛒' },
];

export default function LoginScreen({ navigation }: any) {
  const { login, isLoading } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Animation shared values
  const scale = useSharedValue(1);

  const handleLogin = () => {
    if (!phone || !password) {
      scale.value = withSequence(withTiming(1.05), withSpring(1));
      Alert.alert('Required', 'Please enter both phone and password');
      return;
    }

    const result = login({ phone, password, role });
    if (!result.success) {
      Alert.alert('Login Failed', result.message);
    }
  };

  const fillDemo = (demoPhone: string, demoRole: string) => {
    setPhone(demoPhone);
    setPassword('1234');
    setRole(demoRole);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Premium Background Header */}
      <View style={styles.headerBg}>
        <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🌱</Text>
          <Text style={styles.logoText}>SmartHill</Text>
          <Text style={styles.logoSubtext}>PREMIUM LOGISTICS</Text>
        </Animated.View>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Animated.View 
          entering={FadeInDown.duration(1000).delay(200).springify()}
          style={styles.card}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subtitleText}>Select your role to continue</Text>

            {/* Role Selection Tabs */}
            <View style={styles.roleContainer}>
              {roles.map((r) => {
                const isActive = role === r.value;
                return (
                  <TouchableOpacity 
                    key={r.value}
                    style={[styles.roleTab, isActive && styles.activeRoleTab]}
                    onPress={() => setRole(r.value)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.roleEmoji}>{r.emoji}</Text>
                    <Text style={[styles.roleLabel, isActive && styles.activeRoleLabel]}>{r.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="98765 43210"
                  placeholderTextColor={colors.textMuted}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordRow}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="••••••••"
                    placeholderTextColor={colors.textMuted}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Text style={styles.eyeIcon}>{passwordVisible ? '👁️' : '🙈'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.signupLink}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.signupText}>
                Don't have an account? <Text style={styles.signupHighlight}>Create One</Text>
              </Text>
            </TouchableOpacity>

            {/* Premium Demo Accounts Section */}
            <View style={styles.demoSection}>
              <View style={styles.demoHeader}>
                <View style={styles.demoLine} />
                <Text style={styles.demoTitle}>QUICK DEMO ACCESS</Text>
                <View style={styles.demoLine} />
              </View>
              
              <View style={styles.demoGrid}>
                <TouchableOpacity 
                  style={styles.demoChip} 
                  onPress={() => fillDemo('9876543210', 'farmer')}
                >
                  <Text style={styles.demoChipText}>🌾 Farmer</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.demoChip} 
                  onPress={() => fillDemo('9876500000', 'driver')}
                >
                  <Text style={styles.demoChipText}>🚜 Driver</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.demoChip} 
                  onPress={() => fillDemo('9000000000', 'customer')}
                >
                  <Text style={styles.demoChipText}>🛒 Customer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerBg: {
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: -1,
  },
  logoSubtext: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 3,
    marginTop: -5,
  },
  keyboardView: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  scrollContent: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'left',
  },
  subtitleText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'left',
  },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 20,
    padding: 6,
    marginBottom: spacing.xxl,
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
  },
  activeRoleTab: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  roleEmoji: {
    fontSize: 18,
    marginRight: 6,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeRoleLabel: {
    color: colors.primary,
    fontWeight: '700',
  },
  inputContainer: {
    marginBottom: spacing.xl,
  },
  inputWrapper: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F7F9F7',
    borderWidth: 1.5,
    borderColor: '#EEF2EE',
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  passwordInput: {
    flex: 1,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: -12,
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: spacing.lg,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  signupLink: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  signupText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  signupHighlight: {
    color: colors.primary,
    fontWeight: '700',
  },
  demoSection: {
    marginTop: spacing.md,
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  demoLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  demoTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    marginHorizontal: 12,
    letterSpacing: 1.5,
  },
  demoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  demoChip: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  demoChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
});