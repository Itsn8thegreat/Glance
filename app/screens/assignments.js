import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import assignmentsData from '../../Moodle_backend/assignments.json';
import { Ionicons } from '@expo/vector-icons';

const AssignmentsScreen = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
      setAssignments(assignmentsData);
      setLoading(false);
  }, []);

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
        {assignments.map((assignment, index) => (
          <View key={index} style={styles.assignmentCard}>
            <Text style={styles.assignmentTitle}>{assignment.title || 'No Title'}</Text>
            <Text>Course: {assignment.course || 'N/A'}</Text>
            <Text>Due Date: {assignment.due_date || 'N/A'}</Text>
            <Text>Link: {assignment.link || 'No Link Provided'}</Text>
          </View>
        ))}
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
  assignmentCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  assignmentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  backButton: {
    alignSelf: 'flex-start', // Aligns back button to the start
    margin: 10,
  },
});

export default AssignmentsScreen;
