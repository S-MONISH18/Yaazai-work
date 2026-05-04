import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Alert, 
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import ProofUpload from '../../components/ProofUpload';
import PaymentBreakdown from '../../components/PaymentBreakdown';
import colors from '../../theme/colors';

const STEPS = ['Assigned', 'Arriving', 'Loading', 'In Transit', 'Unloading', 'Completed'];

export default function ActiveTripScreen({ navigation }: any) {
  const [loadingProof, setLoadingProof] = useState(false);
  const [unloadingProof, setUnloadingProof] = useState(false);
  const [tripStatus, setTripStatus] = useState('Assigned');

  const currentStepIndex = STEPS.indexOf(tripStatus);

  const handleAction = () => {
    if (tripStatus === 'Assigned') setTripStatus('Arriving');
    else if (tripStatus === 'Arriving') setTripStatus('Loading');
    else if (tripStatus === 'Loading') {
      if (!loadingProof) {
        Alert.alert('Visual Verification Required', 'Please capture the loading proof to proceed.');
        return;
      }
      setTripStatus('In Transit');
    } else if (tripStatus === 'In Transit') setTripStatus('Unloading');
    else if (tripStatus === 'Unloading') {
      if (!unloadingProof) {
        Alert.alert('Visual Verification Required', 'Please capture the unloading proof to complete the job.');
        return;
      }
      setTripStatus('Completed');
    } else if (tripStatus === 'Completed') {
      Alert.alert('Job Finalized ✅', 'Funds have been distributed. Thank you for your service!');
      navigation.goBack();
    }
  };

  const getButtonText = () => {
    switch (tripStatus) {
      case 'Assigned': return 'Proceed to Pickup';
      case 'Arriving': return 'Confirm Arrival';
      case 'Loading': return 'Start Transit';
      case 'In Transit': return 'Arrived for Delivery';
      case 'Unloading': return 'Finalize Order';
      case 'Completed': return 'Return to Terminal';
      default: return 'Next Stage';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Premium Header / Stepper */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backEmoji}>⬅️</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Active Mission</Text>
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        <View style={styles.stepperContainer}>
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;
            return (
              <View key={step} style={styles.stepItem}>
                <View style={[
                  styles.stepDot, 
                  isCompleted && styles.completedDot,
                  isActive && styles.activeDot
                ]}>
                  {isCompleted && <Text style={styles.checkMark}>✓</Text>}
                </View>
                {index < STEPS.length - 1 && (
                  <View style={[
                    styles.stepLine,
                    isCompleted && styles.completedLine
                  ]} />
                )}
              </View>
            );
          })}
        </View>
        <Text style={styles.statusText}>{tripStatus.toUpperCase()}</Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Trip Details Card */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>MANIFEST ID</Text>
              <Text style={styles.infoValue}>#SH-99281</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>LOAD WEIGHT</Text>
              <Text style={styles.infoValue}>850 KG</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.routeBox}>
            <Text style={styles.locationTitle}>📍 Pickup Point</Text>
            <Text style={styles.locationSub}>Siva's Farm, Pollachi, TN</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.locationTitle}>🏁 Destination</Text>
            <Text style={styles.locationSub}>Salem Wholesale Market, TN</Text>
          </View>
        </Animated.View>

        {/* Actionable Tasks */}
        <Text style={styles.sectionTitle}>Verification Tasks</Text>
        
        {(tripStatus === 'Loading' || currentStepIndex > 2) && (
          <Animated.View entering={FadeInDown.delay(300)}>
            <ProofUpload
              label="Loading Verification"
              isUploaded={loadingProof}
              onPress={() => {
                Alert.alert('Camera', 'Simulating image capture...');
                setTimeout(() => setLoadingProof(true), 1500);
              }}
            />
          </Animated.View>
        )}

        {(tripStatus === 'Unloading' || currentStepIndex > 4) && (
          <Animated.View entering={FadeInDown.delay(400)}>
            <ProofUpload
              label="Delivery Verification"
              isUploaded={unloadingProof}
              onPress={() => {
                Alert.alert('Camera', 'Simulating image capture...');
                setTimeout(() => setUnloadingProof(true), 1500);
              }}
            />
          </Animated.View>
        )}

        <PaymentBreakdown 
          amount={1850} 
          status={tripStatus === 'Completed' ? 'Released' : 'IN ESCROW'} 
        />
        
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Primary Action Button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.actionBtn, tripStatus === 'Completed' && styles.completedBtn]} 
          onPress={handleAction}
          activeOpacity={0.85}
        >
          <Text style={styles.actionBtnText}>{getButtonText()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: '#FFF',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backEmoji: { fontSize: 18 },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  liveBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  liveText: {
    color: colors.danger,
    fontSize: 10,
    fontWeight: '900',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 10,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  activeDot: {
    backgroundColor: colors.primary,
    transform: [{ scale: 1.2 }],
    borderWidth: 3,
    borderColor: colors.primarySoft,
  },
  completedDot: {
    backgroundColor: colors.primary,
  },
  checkMark: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
  },
  stepLine: {
    flex: 1,
    height: 3,
    backgroundColor: '#F0F0F0',
    marginHorizontal: -2,
  },
  completedLine: {
    backgroundColor: colors.primary,
  },
  statusText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1.5,
    marginTop: 5,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 32,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
  },
  routeBox: {
    gap: 4,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },
  locationSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  verticalLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.borderLight,
    marginLeft: 8,
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1,
    borderColor: colors.borderLight,
  },
  actionBtn: {
    backgroundColor: colors.primary,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  completedBtn: {
    backgroundColor: colors.success,
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  bottomSpacer: {
    height: 100,
  },
});
