import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CatalogoDeJogos() {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  const handlePress = (index) => {
    setSelectedButtonIndex(index);
  };

  const dataSets = [
    [
      { id: '1', title: 'Caixa 1' },
      { id: '2', title: 'Caixa 2' },
      { id: '3', title: 'Caixa 3' },
      { id: '4', title: 'Caixa 4' },
      { id: '5', title: 'Caixa 5' },
    ],
    [
      { id: '6', title: 'Caixa 6' },
      { id: '7', title: 'Caixa 7' },
      { id: '8', title: 'Caixa 8' },
      { id: '9', title: 'Caixa 9' },
      { id: '10', title: 'Caixa 10' },
    ],
    [
      { id: '11', title: 'Caixa 11' },
      { id: '12', title: 'Caixa 12' },
      { id: '13', title: 'Caixa 13' },
      { id: '14', title: 'Caixa 14' },
      { id: '15', title: 'Caixa 15' },
    ],
    [
      { id: '16', title: 'Caixa 16' },
      { id: '17', title: 'Caixa 17' },
      { id: '18', title: 'Caixa 18' },
      { id: '19', title: 'Caixa 19' },
      { id: '20', title: 'Caixa 20' },
    ],
  ];

  const selectedData = dataSets[selectedButtonIndex] || [];

  const renderItem = ({ item }) => (
    <View style={styles.box1}>
      <Text style={styles.boxText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <LinearGradient
        colors={['rgba(120,20,100,0.8)', 'rgba(120,20,220,0.8)']}
        style={styles.catalogocor}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.ViewCatálogo1}>
          <Text style={styles.TitleCatalogo1}>GameInClub</Text>
          <Text style={styles.TitleCatalogo2}>Jogue com prazer</Text>
          <View style={styles.inputContainer}>
            <View style={styles.searchSection}>
              <AntDesign name="search1" size={24} color="black" style={styles.searchIcon} />
              <TextInput style={styles.Pesquisa} placeholder="Pesquisa" />
            </View>
            <View style={styles.buttonContainer2}>
              {['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'].map((opcao, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.BtnCatalogo, 
                    {
                      backgroundColor: selectedButtonIndex === index ? 'black' : 'white',
                    }
                  ]}
                  onPress={() => handlePress(index)}
                >
                  <Text style={[
                    styles.btnText2, 
                    { color: selectedButtonIndex === index ? 'white' : 'black' }
                  ]}>
                    {opcao}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <FlatList
              data={selectedData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  catalogocor: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  ViewCatálogo1: {
    padding: 20,
  },
  TitleCatalogo1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  TitleCatalogo2: {
    fontSize: 18,
    color: 'gray',
  },
  inputContainer: {
    marginTop: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  Pesquisa: {
    flex: 1,
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  BtnCatalogo: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 5,
  },
  btnText2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  box1: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  boxText: {
    fontSize: 16,
  },
});




