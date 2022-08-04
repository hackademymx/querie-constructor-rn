import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  const [filtres, setFilters] = React.useState({
    color: "",
    name: "",
    country: "",
  });

  const [url, setUrl] = React.useState("");
  const [reload, setReload] = React.useState("");

  //https://www.miapi.com/users?name=jesus&color=red&country=Mexico

  const changeValue = (name, text) => {
    setFilters({
      ...filtres,
      [name]: text,
    });
  };

  React.useEffect(() => {
    let newUrl = "https://miapi.com/users";
    let contador = 0;

    for (let property in filtres) {
      if (filtres[property] !== "") {
        if (contador === 0) {
          newUrl += "?";
        } else {
          newUrl += "&";
        }
        newUrl += `${property}=${filtres[property]}`;
        contador++;
      }
    }
    setUrl(newUrl);
  }, [reload, filtres]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{url}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="color"
        value={filtres.color}
        onChangeText={(text) => changeValue("color", text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="nombre"
        value={filtres.name}
        onChangeText={(text) => changeValue("name", text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="pais"
        value={filtres.country}
        onChangeText={(text) => changeValue("country", text)}
      />
      <Button title="Buscar" onPress={() => setReload(!reload)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginBottom: 5,
  },
});
