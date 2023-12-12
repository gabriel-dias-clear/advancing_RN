import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import api from '../services/api';

class Conversor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moedaA: props.moedaA,
      moedaB: props.moedaB,
      moedaB_valor: 0,
      valorConvertido: 0,
    };

    this.converter = this.converter.bind(this);
  }

  async converter() {
    let this_for = this.state.moedaA + '_' + this.state.moedaB;
    const response = await api.get(
      `convert?q=${this_for}&compact=ultra&apiKey=7c5ef455b88d735bc6ad`,
    );
    let cot = response.data[this_for];

    let resultado = cot * parseFloat(this.state.moedaB_valor);

    this.setState({
      valorConvertido: resultado.toFixed(2),
    });
  }

  render() {
    const {moedaA, moedaB} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
          {moedaA} para {moedaB}
        </Text>

        <TextInput
          placeholder="Valor a ser convertido"
          style={styles.input}
          onChangeText={moedaB_valor => this.setState({moedaB_valor})}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.botaoArea} onPress={this.converter}>
          <Text style={styles.botaoTexto}></Text>
        </TouchableOpacity>

        <Text style={styles.valorConvertido}>
          {this.state.valorConvertido === 0 ? '' : this.state.valorConvertido}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    width: 280,
    height: 45,
    backgroundColor: '#CCC',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 20,
    color: '#000',
    borderRadius: 5,
  },
  botaoArea: {
    width: 150,
    height: 45,
    backgroundColor: '#FF0000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  botaoTexto: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF',
  },
  valorConvertido: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
  },
});

export default Conversor;
