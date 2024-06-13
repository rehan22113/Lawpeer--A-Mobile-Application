import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const PrivacyPolicy = () => {
  return (
    <ScrollView>

    <View className="mb-3" style={styles.container}>
      <Text style={styles.title}>Privacy Policy for LawPeer Mobile Application</Text>
      
      <Text style={styles.sectionTitle}>1. Information We Collect</Text>
      <Text style={styles.paragraph}>
        When you use our LawPeer mobile application (“App”), we may collect personal information that you provide voluntarily, including but not limited to:
        - Your name
        - Contact information (e.g., email address, phone number)
        - Profile information (e.g., photo, professional credentials)
        - Payment information (e.g., credit card details)
      </Text>
      
      <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        We may use the information we collect for various purposes, including:
        - Providing and improving our services
        - Personalizing your experience
        - Communicating with you
        - Processing transactions
        - Analyzing usage trends
      </Text>
      
      <Text style={styles.sectionTitle}>3. Sharing of Information</Text>
      <Text style={styles.paragraph}>
        We may share your information with third parties in the following circumstances:
        - With your consent
        - To comply with legal obligations
        - To protect our rights or the rights of others
        - In connection with a merger, acquisition, or sale of assets
      </Text>
      
      <Text style={styles.sectionTitle}>4. Data Security</Text>
      <Text style={styles.paragraph}>
        We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
      </Text>
      
      <Text style={styles.sectionTitle}>5. Your Choices</Text>
      <Text style={styles.paragraph}>
        You may choose not to provide certain information, but this may limit your ability to use certain features of the App. You can also review and update your information by accessing your account settings.
      </Text>
      
      <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
      <Text style={styles.paragraph}>
        Our App is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.
      </Text>
      
      <Text style={styles.sectionTitle}>7. Changes to This Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </Text>
      
    </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default PrivacyPolicy;
