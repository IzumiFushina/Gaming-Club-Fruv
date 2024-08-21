import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },

  //Tela Catalogo de jogos
  
  box1: {
    backgroundColor: 'lightgray',
    width: 200,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 35,
  },
  boxText: {
    fontSize: 12,
    color: 'black',
  },
  BtnCatalogo: {
      marginHorizontal: 5, 
      padding: 10,
      backgroundColor: '#000', 
      borderRadius: 20,
      height: 50,
      width: "20%",
      borderColor: 'gray',
      borderWidth: 1,
    },
  
  TitleCatalogo1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50, 
    
  },
  TitleCatalogo2: {
    fontSize: 18,
    fontWeight: 'normal',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, 
    
  },

  TextInput: {
   shadowColor: "black",
  },

  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5, 
    
    
  },
  ViewCatálogo1: {
    padding: 16,
    
    
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    width: '90%',
    height: 55,
  },
  searchIcon: {
    padding: 10,
  },

});