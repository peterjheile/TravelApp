import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      <Text style={styles.subtitle}>
        Get started with our amazing app
      </Text>
      
      <View style={styles.buttonContainer}>
        <Link href="./(tabs)/explore" asChild>
          <Button title="Get Started" onPress={() => {}} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});
