import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../util/size';
import { colors } from '../util/colors';

const minutesToMs = min => min * 1000 * 60;

const formatTime = time => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes = 15,
  isPaused,
  onProgress,
  onEnd
}) => {
  const [ms, setMs] = useState(minutesToMs(minutes));
  const interval = React.useRef(null);

  const countdown = () => {
    setMs((time) => {
      if(time === 0) {
        clearInterval(interval.current);
        // onEnd();
        // Note this code above is not a good practice since setMs() is a state function (re-renders) and 
        // onProgress is another state function passed down from the parent component (that re-renders).**
        return time;
      }

      const timeLeft = time - 1000;
      // onProgress(timeLeft / minutesToMs(minutes))
      // Note this code above is not a good practice since setMs() is a state function (re-renders) and 
      // onProgress is another state function passed down from the parent component (that re-renders).**
      return timeLeft;
    }) 
  }

  // ** instead, by using useEffect and passing in ms as the dependency so that everytime ms changes, the onProgress function gets invoked, would be the cleaner way of coding. 
  useEffect(() => {
    onProgress(ms / minutesToMs(minutes));
    if(time === 0) {
      onEnd();
    }
  }, [ms])

// Equivalent to componentDidUpdate
  useEffect(() => {
    setMs(minutesToMs(minutes));
  }, [minutes])

  
  useEffect(() => {
    if (isPaused) {
      if(interval.current) clearInterval(interval.current);
      return;
    }
    
    interval.current = setInterval(countdown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);


  const min = Math.floor(ms / 1000 / 60) % 60;
  const sec = Math.floor(ms / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(min)}:{formatTime(sec)}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxl,
    padding: spacing.lg,
    color: colors.white,
    backgroundColor: "#00000050"
  }
})