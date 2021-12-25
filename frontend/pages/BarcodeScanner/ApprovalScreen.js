/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { styles } from './styles/index';
import LottieView from 'lottie-react-native';
import { colors } from '../../constants/styles';
import { navigate } from '../../services/navRef';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
export default function ApprovalScreen({ barcodeId }) {
  let animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(0);
  useInterval(() => {
    if(progress < 100) {
      setProgress(progress + 1);
    }
  }, 15);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100,
      useNativeDriver: true
    }).start();
    if (progress == 100) {
      navigate('Home');
    }
  },[progress])
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.approvalAnimation}
        source={require('../../images/5449-success-tick.json')}
        autoPlay
        loop
      />
      <Text style={styles.successNotifier}>Product with barcode id {barcodeId} is successfully added!</Text>
      <TouchableOpacity onPress={ () => navigate('Home')} style={styles.bar}>
        <View style={styles.progressBar}>
            <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: `${colors.green}`, width: progress + '%', borderRadius: 10 }}>
              <Text style={styles.successNotifier}>Click Me to Pass</Text>
            </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
