import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const AssignmentsScreen = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/assignments')
      .then((response) => response.json())
      .then((data) => {
        // If data contains an error, handle it
        if (data.error) {
          console.error('Error fetching assignments:', data.error);
        } else {
          setAssignments(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching assignments:', error);
        setLoading(false);
      });
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {assignments.map((assignment, index) => (
          <View key={index} style={styles.assignmentCard}>
            <Text style={styles.assignmentTitle}>{assignment.title}</Text>
            <Text>Course: {assignment.course}</Text>
            <Text>Due Date: {assignment.due_date}</Text>
            <Text>Link: {assignment.link}</Text> {/* Display the link if needed */}
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
});

export default AssignmentsScreen;
