import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from './styles';

const Rating = ({ rating, onRate }) => {
  const hearts = [];

  for (let i = 1; i <= 5; i++) {
    const name = rating >= i ? (i === 5 ? 'stars' : 'star-rate') : 'star-outline';
    const color = rating >= i ? COLORS.light : COLORS.light;

    hearts.push(
      <TouchableOpacity key={i} onPress={() => onRate(i)}>
        <MaterialIcons name={name} size={28} color={color} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flexDirection: 'row', gap: 5 }}>
      {hearts}
    </View>
  );
};

export default Rating;