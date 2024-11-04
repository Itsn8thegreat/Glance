import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { useNavigation } from '@react-navigation/native';


const ScheduleScreen = () => {
  const navigation = useNavigation();


  // Example function to handle button press
  const handleClassInfoPress = (index) => {
    console.log(`Class Info Button ${index + 1} pressed`);
  };


  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
     
      <Text style={styles.header}>SCHEDULE</Text>
      <Text style={styles.subheader}>WEEK AT A GLANCE</Text>


      <View style={styles.greenBox} />


      <Text style={styles.classInfoHeader}>CLASS INFO</Text>


      <View style={styles.classInfoContainer}>
        {Array.from({ length: 8 }, (_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.classInfoButton}
            onPress={() => handleClassInfoPress(index)}
          >
            <Text style={styles.buttonText}>Class {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start', // Aligns back button to the start
    margin: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 20,
  },
  subheader: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  greenBox: {
    width: '100%',
    height: 100,
    backgroundColor: 'green',
    marginBottom: 20,
  },
  classInfoHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
    marginVertical: 10,
  },
  classInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  classInfoButton: {
    width: '48%', // Adjust to create two columns
    height: 70,
    backgroundColor: 'black',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});


export default ScheduleScreen;


