/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BatteryModule from './BatteryModule';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <BatteryScreen isDarkMode={isDarkMode} />
    </SafeAreaProvider>
  );
}


function BatteryScreen({ isDarkMode }: { isDarkMode: boolean }) {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getBatteryLevel = async () => {
    try {
      setLoading(true);
      const level = await BatteryModule.getBatteryLevel();
      setBatteryLevel(level);
    } catch (error) {
      Alert.alert('Error', 'Failed to get battery level: ' + (error as Error).message);
      console.error('Error getting battery level:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBatteryLevel();
  }, []);

  const backgroundColor = isDarkMode ? '#1c1c1e' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const cardBackground = isDarkMode ? '#2c2c2e' : '#f2f2f7';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]}>Battery Level</Text>
        
        <View style={[styles.card, { backgroundColor: cardBackground }]}>
          {loading ? (
            <ActivityIndicator size="large" color={isDarkMode ? '#ffffff' : '#007AFF'} />
          ) : batteryLevel !== null ? (
            <>
              <Text style={[styles.batteryLevel, { color: textColor }]}>
                {batteryLevel.toFixed(1)}%
              </Text>
              <View style={styles.batteryBarContainer}>
                <View
                  style={[
                    styles.batteryBar,
                    {
                      width: `${batteryLevel}%`,
                      backgroundColor:
                        batteryLevel > 50
                          ? '#34C759'
                          : batteryLevel > 20
                          ? '#FF9500'
                          : '#FF3B30',
                    },
                  ]}
                />
              </View>
            </>
          ) : (
            <Text style={[styles.errorText, { color: textColor }]}>
              No battery data available
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isDarkMode ? '#007AFF' : '#007AFF' },
            loading && styles.buttonDisabled,
          ]}
          onPress={getBatteryLevel}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Refresh Battery Level'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  card: {
    width: '100%',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  batteryLevel: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  batteryBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#e5e5ea',
    borderRadius: 10,
    overflow: 'hidden',
  },
  batteryBar: {
    height: '100%',
    borderRadius: 10,
  },
  errorText: {
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 200,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;
