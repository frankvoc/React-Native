import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { Text, Card, ListItem, Icon } from 'react-native-elements';

export default function App() {
  const projects = [
    {
      title: 'This is a placeholder',
      description: 'Description of project 1.',
      image: 'https://i.imgur.com/oQpwTy7.png',
    },
    {
      title: 'This is also a placeholder',
      description: 'Description of project 2.',
      image: 'https://i.imgur.com/yOcN2P3.png',
    },
  ];

  const skills = ['Skill 1', 'Skill 2', 'Skill 3'];
  const contactDetails = [
    { type: 'email', text: 'Email: frank@example.com', icon: 'email' },
    { type: 'linkedin', text: "LinkedIn: I don't have one", icon: 'email' },
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/640px-Smiley.svg.png' }} style={styles.profileImage} />
        <Text h2 style={styles.headerText}>Frank's Portfolio</Text>
        <Text style={styles.introText}>Hi, I'm Frank.</Text>

        <Card containerStyle={styles.card}>
          <Card.Title>Projects</Card.Title>
          <Card.Divider />
          {projects.map((project, index) => (
            <View key={index}>
              <Card.Image source={{ uri: project.image }} />
              <Card.Title>{project.title}</Card.Title>
              <Text style={styles.projectDescription}>{project.description}</Text>
              <Card.Divider />
            </View>
          ))}
        </Card>

        <Card containerStyle={styles.card}>
          <Card.Title>Skills</Card.Title>
          <Card.Divider />
          {skills.map((skill, index) => (
            <ListItem key={index} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{skill}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>

        <Card containerStyle={styles.card}>
          <Card.Title>Contact</Card.Title>
          <Card.Divider />
          {contactDetails.map((contact, index) => (
            <ListItem key={index} bottomDivider>
              <Icon name={contact.icon} type="material" />
              <ListItem.Content>
                <ListItem.Title>{contact.text}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>

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
  card: {
    width: '100%',
    marginVertical: 10,
  },
  projectDescription: {
    marginVertical: 10,
  },
});
