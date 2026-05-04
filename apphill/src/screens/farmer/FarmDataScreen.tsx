import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../theme/colors';
const SensorCard = ({ title, value, icon, unit, color, status }: any) => (
  <View style={styles.sensorCard}>
    <View style={[styles.sensorIconBg, { backgroundColor: color + '15' }]}>
      <Text style={styles.sensorEmoji}>{icon}</Text>
    </View>
    <View style={styles.sensorInfo}>
      <Text style={styles.sensorTitle}>{title}</Text>
      <View style={styles.sensorValueRow}>
        <Text style={styles.sensorValue}>{value}</Text>
        <Text style={styles.sensorUnit}>{unit}</Text>
      </View>
      <View style={[styles.statusBadge, status === 'Optimal' ? styles.statusOptimalBg : styles.statusWarningBg]}>
        <Text style={[styles.statusText, status === 'Optimal' ? styles.statusOptimalText : styles.statusWarningText]}>{status}</Text>
      </View>
    </View>
  </View>
);

export default function FarmDataScreen() {
  const [farmData] = useState({
    nodeCount: 24,
    landArea: 15.5,
    activeNodes: 22,
    soilMoisture: 65,
    temperature: 28,
    humidity: 72,
    pH: 6.8,
    nitrogen: 42,
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Farm Monitor</Text>
        <Text style={styles.headerSubtitle}>Real-time IoT Sensor Data</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Farm Overview Banner */}
        <View style={styles.overviewBanner}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewValue}>{farmData.activeNodes}/{farmData.nodeCount}</Text>
            <Text style={styles.overviewLabel}>Active Nodes</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewItem}>
            <Text style={styles.overviewValue}>{farmData.landArea}</Text>
            <Text style={styles.overviewLabel}>Acres Managed</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewItem}>
            <Text style={styles.overviewValue}>92%</Text>
            <Text style={styles.overviewLabel}>Health Score</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Environmental Conditions</Text>
        <View style={styles.grid}>
          <SensorCard 
            title="Temperature" 
            value={farmData.temperature} 
            unit="°C" 
            icon="🌡️" 
            color="#FF7043" 
            status="Optimal"
          />
          <SensorCard 
            title="Humidity" 
            value={farmData.humidity} 
            unit="%" 
            icon="💨" 
            color="#26A69A" 
            status="Optimal"
          />
        </View>

        <Text style={styles.sectionTitle}>Soil Analysis</Text>
        <View style={styles.grid}>
          <SensorCard 
            title="Moisture" 
            value={farmData.soilMoisture} 
            unit="%" 
            icon="💧" 
            color="#42A5F5" 
            status="Optimal"
          />
          <SensorCard 
            title="Soil pH" 
            value={farmData.pH} 
            unit="pH" 
            icon="🧪" 
            color="#9575CD" 
            status="Optimal"
          />
          <SensorCard 
            title="Nitrogen" 
            value={farmData.nitrogen} 
            unit="mg/kg" 
            icon="🌿" 
            color="#66BB6A" 
            status="Warning"
          />
          <View style={styles.placeholderCard} />
        </View>

        {/* Map Visualization Placeholder */}
        <View style={styles.mapPreviewCard}>
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Node Distribution Map</Text>
            <TouchableOpacity><Text style={styles.expandText}>Expand Map</Text></TouchableOpacity>
          </View>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapOverlay}>
              <Text style={styles.mapEmoji}>📍</Text>
              <Text style={styles.mapText}>Visualizing {farmData.nodeCount} sensors</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  overviewBanner: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 24,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
  },
  overviewDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  overviewLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  sensorCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  placeholderCard: {
    flex: 1,
    minWidth: '45%',
  },
  sensorIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  sensorEmoji: {
    fontSize: 22,
  },
  sensorInfo: {
    flex: 1,
  },
  sensorTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sensorValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
    marginBottom: 8,
  },
  sensorValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  sensorUnit: {
    fontSize: 14,
    color: colors.textMuted,
    marginLeft: 4,
    fontWeight: '600',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusOptimalBg: { backgroundColor: '#E8F5E9' },
  statusWarningBg: { backgroundColor: '#FFF3E0' },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusOptimalText: { color: '#2E7D32' },
  statusWarningText: { color: '#EF6C00' },
  mapPreviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginTop: 10,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  expandText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapOverlay: {
    alignItems: 'center',
  },
  mapEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  mapText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});