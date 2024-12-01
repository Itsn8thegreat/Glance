import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Local course data import (you should replace this with the correct path)
import courseData from '../../Backend/courseData.json'; 

const ScheduleScreen = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the local course data file directly
        setCourses(courseData);
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLinkPress = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="green" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Green Box with Image */}
        <View style={styles.greenBox}>
          <Image
            source={require('../../Backend/course_schedule.png')} // Adjust path as needed
            style={styles.scheduleImage}
            resizeMode="contain"
          />
        </View>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <View key={index} style={styles.courseCard}>
              <Text style={styles.courseTitle}>{course.name || 'No Course Name'}</Text>
              <Text>Course Number: {course.number || 'N/A'}</Text>
              <Text>Timing: {course.timing || 'N/A'}</Text>
              <Text>Location: {course.location || 'N/A'}</Text>
              <Text
                style={styles.linkText}
                onPress={() => handleLinkPress(course.link)}
              >
                {course.link || 'No Link Provided'}
              </Text>
            </View>
          ))
        ) : (
          <Text>No course data available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  courseCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  backButton: {
    alignSelf: 'flex-start', // Aligns back button to the start
    margin: 10,
  },
  greenBox: {
    height: 200,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  scheduleImage: {
    width: '100%',
    height: '100%',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});

export default ScheduleScreen;
