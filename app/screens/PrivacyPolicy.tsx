import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.content}>
          Datacrunch is a demo application designed solely for the purpose of demonstrating
          the capabilities and features of the Datacrunch platform. This app does not collect,
          store, or share any personal or sensitive user data. 

          All data used within the application is either mock data or anonymized for testing
          and presentation purposes only. The application may simulate certain behaviors of
          a real data-driven app, such as data processing, analytics visualization, or user
          interactions, but none of the information is actually transmitted, saved, or used
          for tracking.

          By using the Datacrunch demo app, you acknowledge that the app is intended only
          for showcase and demonstration, and should not be treated as a production-ready
          or commercially active application. Any changes made in the app are purely for
          visual or interactive purposes and do not affect any real databases or user records.

          This privacy policy is applicable only to this demonstration app. For official
          Datacrunch services or applications, please refer to the respective policies provided
          by the organization behind the Datacrunch platform.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign:'justify'
  },
});

export default PrivacyPolicy;
