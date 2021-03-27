import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../util/colors';
import { spacing } from '../../util/size';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';

import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(1000);
    }
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ padding: spacing.sm }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
        <View style={{ paddingTop: spacing.sm }}>
          <ProgressBar
            progress={progress}
            color="#000"
            style={{ height: 5, marginTop: spacing.sm }}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Timing onChangeTime={changeTime} />
        </View>
        <View style={styles.buttonWrapper}>
          {!isStarted ? (
            <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
          ) : (
            <RoundedButton title="Pause" onPress={() => clearSubject()} />
          )}
        </View>
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="Clear" size={50} onPress={() => clearSubject(true)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
});
