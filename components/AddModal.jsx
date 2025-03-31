import React, { useState } from "react";
import { View, Modal, TouchableOpacity, StyleSheet, TextInput, Text, Animated } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

export const AddModal = ({ visible, onClose, onPress }) => {
  const [head, setHead] = useState("");
  const [text, setText] = useState("");
  const slideAnim = React.useRef(new Animated.Value(-600)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  const handleClose = () => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: -600,
        useNativeDriver: true,
        tension: 40,
        friction: 8,
      }),
      Animated.spring(rotateAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 8,
      })
    ]).start(() => {
      onClose();
    });
  };

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 40,
          friction: 8,
        }),
        Animated.spring(rotateAnim, {
          toValue: 45,
          useNativeDriver: true,
          tension: 2,
          friction: 800,
        })
      ]).start();
    }
  }, [visible]);

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.addButton}>
        <Animated.View style={{ transform: [{ rotate: rotateAnim.interpolate({
          inputRange: [0, 45],
          outputRange: ['0deg', '45deg']
        }) }] }}>
          <Entypo name="plus" size={32} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
        <Animated.View 
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TextInput 
            style={styles.headInput}
            placeholder='head'
            value={head}
            onChangeText={setHead}
            cursorColor='#2a785a' 
          />
          <TextInput 
            style={styles.textInput}
            placeholder='text'
            value={text}
            onChangeText={setText}
            multiline={true} 
            numberOfLines={400}
            cursorColor='#2a785a'  
          />
          <View style={styles.buttons}>
            <View style={styles.button}>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={22} color="black" style={{padding: 13}} />
              </TouchableOpacity>
              <Text style={{color: '#ccc'}}>|</Text>
              <TouchableOpacity>
                <Ionicons  name="alarm-outline" size={22} color="black" style={{padding: 13}} />
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity>
                <Ionicons  name="camera-outline" size={22} color="black" style={{padding: 13}} />
              </TouchableOpacity>
              <Text style={{color: '#ccc'}}>|</Text>
              <TouchableOpacity>
                <Ionicons  name="images-outline" size={22} color="black" style={{padding: 13}} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.enterButton}>
            <Text style={{fontFamily: 'Bold', color: '#fff'}}>Add item</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.modalCloser}  onPress={handleClose} />
    </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalCloser: {
    height: 500,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    width: '100%',
    height: 490,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  addButton: {
    backgroundColor: '#2a785a',
    width: 45,
    height: 45,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32.5,
    position: 'absolute',
    left: '2%',
    bottom: '2%',
  },
  headInput: {
    fontFamily: 'Bold',
    height: 50,
    width: '100%',
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  textInput: {
    fontFamily: 'Regular',
    textAlignVertical: "top", 
    height: 200,
    width: '100%',
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 20,
    borderRadius: 25,
  },
  buttons: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderRadius: 25
  },
  enterButton: {
    height: 50,
    backgroundColor: '#2a785a',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 25
  }
});