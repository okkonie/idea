import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AddModal } from '@/components/AddModal'; // Import the new modal component

export default function Calendar() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text>settings</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
