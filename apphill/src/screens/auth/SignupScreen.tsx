import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useAuth } from '../../context/AuthContext';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const { width } = Dimensions.get('window');

const roles = [
  { label: 'Farmer', value: 'farmer', icon: '🌾' },
  { label: 'Driver', value: 'driver', icon: '🚜' },
  { label: 'Customer', value: 'customer', icon: '🛒' },
];

export default function SignupScreen({ navigation }: any) {
  const { signup, isLoading } = useAuth();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    location: '',
    role: 'farmer',
  });

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!form.name || !form.phone) {
        Alert.alert('Required', 'Please fill name and phone');
        return;
      }
      setStep(2);
    }
  };

  const handleSignup = () => {
    if (!form.password || !form.location) {
      Alert.alert('Required', 'Please complete all fields');
      return;
    }
    const result = signup(form);
    if (result.success) {
      Alert.alert('Welcome!', 'Your account has been created successfully.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(1) : navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${(step / 2) * 100}%` }]} />
        </View>
        <Text style={styles.stepText}>Step {step} of 2</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {step === 1 ? (
            <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepView}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join the SmartHill community</Text>

              <Text style={styles.label}>Select your role</Text>
              <View style={styles.roleGrid}>
                {roles.map((r) => (
                  <TouchableOpacity 
                    key={r.value}
                    style={[styles.roleCard, form.role === r.value && styles.activeRoleCard]}
                    onPress={() => updateField('role', r.value)}
                  >
                    <Text style={styles.roleIcon}>{r.icon}</Text>
                    <Text style={[styles.roleLabel, form.role === r.value && styles.activeRoleLabel]}>{r.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  value={form.name}
                  onChangeText={(v) => updateField('name', v)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="98765 43210"
                  keyboardType="phone-pad"
                  value={form.phone}
                  onChangeText={(v) => updateField('phone', v)}
                />
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleNext}>
                <Text style={styles.primaryBtnText}>Continue</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInRight} style={styles.stepView}>
              <Text style={styles.title}>Secure Account</Text>
              <Text style={styles.subtitle}>Almost there, set your password</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  secureTextEntry
                  value={form.password}
                  onChangeText={(v) => updateField('password', v)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Location / Farm City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Pollachi, Coimbatore"
                  value={form.location}
                  onChangeText={(v) => updateField('location', v)}
                />
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleSignup}>
                <Text style={styles.primaryBtnText}>Create Account</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginHighlight}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  stepText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepView: {
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  roleGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  roleCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  activeRoleCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  roleIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  roleLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  activeRoleLabel: {
    color: colors.primary,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#F7F9F7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    borderWidth: 1.5,
    borderColor: '#EEF2EE',
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 40,
    paddingBottom: 40,
  },
  loginText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  loginHighlight: {
    color: colors.primary,
    fontWeight: '700',
  },
});