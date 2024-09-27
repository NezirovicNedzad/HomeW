import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text,ActivityIndicator } from 'react-native';
import { getProgramsByDifficulty } from '../services/fitnessProgramService' // Import your service

const ProfileScreen = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDifficultySelect = async (difficulty) => {
    setLoading(true); // Start loading
    try {
      const data = await getProgramsByDifficulty(difficulty);
      setResults(data);
      setError('');
    } catch (err) {
      setError('No programs found for the selected difficulty');
      setResults([]);
    }
    setLoading(false); //
  };
  useEffect(() => {
    const fetchInitialPrograms = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getProgramsByDifficulty('beginner');
        setResults(data);
        setError('');
      } catch (err) {
        setError('No programs found for the initial selection');
        setResults([]);
      }
      setLoading(false); // Stop loading
    };

    fetchInitialPrograms();
  }, []); 

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        <Button title="Beginner" onPress={() => handleDifficultySelect('beginner')} />
        <Button title="Intermediate" onPress={() => handleDifficultySelect('intermediate')} />
        <Button title="Advanced" onPress={() => handleDifficultySelect('advanced')} />
      </View>

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()} // Adjust based on your response structure
        renderItem={({ item }) => <Text>{item.naziv}</Text>} // Adjust based on your response structure
      />
    </View>
  );
};

export default ProfileScreen;
