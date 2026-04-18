import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [gridSize, setGridSize] = useState<string>('10');
  const [selected, setSelected] = useState<number | null>(43);

  const size = parseInt(gridSize) || 0;

  const neighbors = useMemo(() => {
    if (selected === null || size <= 0) return [];
    const row = Math.floor(selected / size);
    const col = selected % size;
    const result: number[] = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          result.push(newRow * size + newCol);
        }
      }
    }
    return result.sort((a, b) => a - b);
  }, [selected, size]);

  const palette = {
    background: '#FFF8F0',
    headerBackground: '#FFE4CB',
    headerText: '#8E5F3D',
    borders: '#E6C9A8',
    gridBackground: '#FFFFFF',
    textPrimary: '#6F4E37',
    inputBackground: '#FFF1E0',
    buttonBackground: '#E87D42',
    buttonText: '#FFF8F0',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: palette.background }]}>
      <StatusBar style="dark" />
      <View style={[styles.header, { backgroundColor: palette.headerBackground, borderBottomColor: palette.borders }]}>
        <Text style={[styles.headerTitle, { color: palette.headerText }]}>Ibarreta, Jonie Jane S.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Grid Container */}
        <View style={[styles.gridWrapper, { backgroundColor: palette.gridBackground, borderColor: palette.borders }]}>
          <View style={[styles.grid, { width: size * 32 }]}>
            {Array.from({ length: size * size }).map((_, index) => {
              const label = index.toString().padStart(2, '0');
              const isSelected = selected === index;
              const isNeighbor = neighbors.includes(index);
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.cell, 
                    { borderColor: palette.borders },
                    isSelected && { backgroundColor: palette.buttonBackground },
                    isNeighbor && { backgroundColor: palette.inputBackground },
                  ]}
                  onPress={() => setSelected(index)}
                >
                  <Text style={[
                    styles.cellText, 
                    { color: palette.textPrimary },
                    isSelected && { color: palette.buttonText, fontWeight: 'bold' }
                  ]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Selection Info */}
        <View style={styles.infoSection}>
          <Text style={[styles.infoText, { color: palette.textPrimary }]}>selected = {selected ?? 'None'}</Text>
          <Text style={[styles.infoText, { color: palette.textPrimary }]}>
            {neighbors.join(', ')}
          </Text>
        </View>

        {/* Input Controls */}
        <View style={styles.controls}>
          <Text style={[styles.label, { color: palette.textPrimary }]}>Enter the number of Rows and Columns:</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: palette.inputBackground, 
              borderColor: palette.borders, 
              color: palette.textPrimary 
            }]}
            keyboardType="numeric"
            value={gridSize}
            onChangeText={setGridSize}
          />
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: palette.buttonBackground }]}
            onPress={() => setSelected(null)}
          >
            <Text style={[styles.buttonText, { color: palette.buttonText }]}>REGENERATE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  gridWrapper: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#8E5F3D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 30,
    height: 30,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
  },
  infoSection: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  controls: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});