import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/640px-Smiley.svg.png' }} style={styles.profileImage} />
        <Text style={styles.headerText}>Frank's Portfolio</Text>
        <Text style={styles.introText}>Hi, I'm Frank. A passionate developer.</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Projects</Text>
          <View style={styles.projectItem}>
            <Image source={{ uri: 'https://i.imgur.com/oQpwTy7.png' }} style={styles.projectImage} />
            <Text style={styles.projectTitle}>Project 1</Text>
            <Text style={styles.projectDescription}>Description of project 1.</Text>
          </View>
          <View style={styles.projectItem}>
            <Image source={{ uri: 'https://i.imgur.com/yOcN2P3.png' }} style={styles.projectImage} />
            <Text style={styles.projectTitle}>Project 2</Text>
            <Text style={styles.projectDescription}>Description of project 2.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Skills</Text>
          <Text style={styles.skillItem}>Skill 1</Text>
          <Text style={styles.skillItem}>Skill 2</Text>
          <Text style={styles.skillItem}>Skill 3</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Contact</Text>
          <Text style={styles.contactItem}>Email: frank@example.com</Text>
          <Text style={styles.contactItem}>LinkedIn: linkedin.com/in/frank</Text>
        </View>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  introText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    width: '100%',
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  projectItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  projectImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 14,
  },
  skillItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  contactItem: {
    fontSize: 16,
    marginVertical: 5,
  },
});
