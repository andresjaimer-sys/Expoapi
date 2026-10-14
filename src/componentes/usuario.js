
import React, {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext } from '../context/AppContext';

const TOTAL_POKEMON = 1025;

const POKEMON_RETO = [
  { id: 1, nombre: 'Bulbasaur' },
  { id: 4, nombre: 'Charmander' },
  { id: 6, nombre: 'Charizard' },
  { id: 7, nombre: 'Squirtle' },
  { id: 25, nombre: 'Pikachu' },
  { id: 39, nombre: 'Jigglypuff' },
  { id: 52, nombre: 'Meowth' },
  { id: 54, nombre: 'Psyduck' },
  { id: 94, nombre: 'Gengar' },
  { id: 133, nombre: 'Eevee' },
  { id: 143, nombre: 'Snorlax' },
  { id: 175, nombre: 'Togepi' },
  { id: 448, nombre: 'Lucario' },
];

const imagenPokemon = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

// Mezclar Pokémon aleatoriamente
function mezclar(lista) {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

// Crear una pregunta con cuatro opciones
function crearPregunta() {
  const seleccionados = mezclar(POKEMON_RETO).slice(0, 4);

  return {
    respuesta: seleccionados[0],
    opciones: mezclar(seleccionados),
  };
}

export default function Usuario() {
  const insets = useSafeAreaInsets();
  const { favoritos } = useContext(AppContext);

  const [nombre, setNombre] = useState('Entrenador');
  const [nombreGuardado, setNombreGuardado] = useState(true);
  const [capturados, setCapturados] = useState(0);

  const [pregunta, setPregunta] = useState(crearPregunta);
  const [seleccion, setSeleccion] = useState(null);
  const [racha, setRacha] = useState(0);
  const [record, setRecord] = useState(0);

  // Recuperar nombre y récord guardados
  useEffect(() => {
    let activo = true;

    async function cargarPerfil() {
      try {
        const [nombrePrevio, recordPrevio] = await Promise.all([
          AsyncStorage.getItem('nombreEntrenador'),
          AsyncStorage.getItem('recordRetoPokemon'),
        ]);

        if (!activo) return;

        if (nombrePrevio) {
          setNombre(nombrePrevio);
        }

        if (recordPrevio) {
          setRecord(Number(recordPrevio) || 0);
        }
      } catch (error) {
        console.log('Error al cargar el perfil:', error);
      }
    }

    cargarPerfil();

    return () => {
      activo = false;
    };
  }, []);

  // Actualizar capturados al entrar a Usuario
  useFocusEffect(
    useCallback(() => {
      let activo = true;

      async function cargarColeccion() {
        try {
          const datos = await AsyncStorage.getItem('misNumeros');
          const ids = datos ? JSON.parse(datos) : [];

          if (activo) {
            const validos = Array.isArray(ids)
              ? [
                  ...new Set(
                    ids
                      .map(Number)
                      .filter(
                        (id) =>
                          Number.isInteger(id) &&
                          id >= 1 &&
                          id <= TOTAL_POKEMON
                      )
                  ),
                ]
              : [];

            setCapturados(validos.length);
          }
        } catch (error) {
          console.log('Error al cargar colección:', error);
        }
      }

      cargarColeccion();

      return () => {
        activo = false;
      };
    }, [])
  );

  // Guardar nombre del entrenador
  async function guardarNombre() {
    const limpio = nombre.trim() || 'Entrenador';

    setNombre(limpio);

    try {
      await AsyncStorage.setItem(
        'nombreEntrenador',
        limpio
      );

      setNombreGuardado(true);
    } catch (error) {
      console.log('Error al guardar nombre:', error);
    }
  }

  // Comprobar respuesta del minijuego
  async function responder(id) {
    if (seleccion !== null) return;

    setSeleccion(id);

    if (id === pregunta.respuesta.id) {
      const siguiente = racha + 1;

      setRacha(siguiente);

      if (siguiente > record) {
        setRecord(siguiente);

        try {
          await AsyncStorage.setItem(
            'recordRetoPokemon',
            String(siguiente)
          );
        } catch (error) {
          console.log('Error al guardar récord:', error);
        }
      }
    } else {
      setRacha(0);
    }
  }

  function siguienteReto() {
    setPregunta(crearPregunta());
    setSeleccion(null);
  }

  const completado = Math.min(
    100,
    (capturados / TOTAL_POKEMON) * 100
  );

  const respondido = seleccion !== null;
  const acerto = seleccion === pregunta.respuesta.id;

  return (
    <View style={styles.pantalla}>
      <ScrollView
        contentContainerStyle={[
          styles.contenido,
          {
            paddingTop: Math.max(insets.top, 16) + 12,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* PORTADA DEL ENTRENADOR */}
        <View style={styles.portada}>
          <View style={styles.circuloGrande} />

          <Text style={styles.sobretitulo}>
            CENTRO DE ENTRENADOR
          </Text>

          <Text style={styles.titulo}>
            Mi aventura Pokémon
          </Text>

          <View style={styles.perfilFila}>
            <View style={styles.avatarCaja}>
              <Image
                source={{ uri: imagenPokemon(133) }}
                style={styles.avatar}
              />
            </View>

            <View style={styles.nombreCaja}>
              <Text style={styles.campoTitulo}>
                NOMBRE DEL ENTRENADOR
              </Text>

              <TextInput
                style={styles.entradaNombre}
                value={nombre}
                onChangeText={(texto) => {
                  setNombre(texto);
                  setNombreGuardado(false);
                }}
                maxLength={24}
                placeholder="Tu nombre"
                placeholderTextColor="#A8B7D3"
                returnKeyType="done"
                onSubmitEditing={guardarNombre}
              />

              <Pressable
                style={styles.botonNombre}
                onPress={guardarNombre}
              >
                <Text style={styles.botonNombreTexto}>
                  {nombreGuardado
                    ? '✓ Guardado'
                    : 'Guardar nombre'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* ESTADÍSTICAS */}
        <Text style={styles.tituloSeccion}>
          Tu progreso
        </Text>

        <View style={styles.estadisticas}>
          <View style={styles.estadistica}>
            <Text style={styles.iconoEstadistica}>⭐</Text>

            <Text style={styles.valorEstadistica}>
              {favoritos.length}
            </Text>

            <Text style={styles.etiquetaEstadistica}>
              Favoritos
            </Text>
          </View>

          <View style={styles.estadistica}>
            <Text style={styles.iconoEstadistica}>🎯</Text>

            <Text style={styles.valorEstadistica}>
              {capturados}
            </Text>

            <Text style={styles.etiquetaEstadistica}>
              Capturados
            </Text>
          </View>
        </View>

        {/* PROGRESO DE COLECCIÓN */}
        <View style={styles.progresoCaja}>
          <View style={styles.progresoFila}>
            <Text style={styles.progresoTitulo}>
              Álbum de colección
            </Text>

            <Text style={styles.progresoNumero}>
              {capturados} / {TOTAL_POKEMON}
            </Text>
          </View>

          <View style={styles.barraFondo}>
            <View
              style={[
                styles.barraActual,
                { width: `${completado}%` },
              ]}
            />
          </View>

          <Text style={styles.progresoDescripcion}>
            Cada Pokémon diferente que consigues
            aumenta tu progreso.
          </Text>
        </View>

        {/* CABECERA DEL MINIJUEGO */}
        <View style={styles.retoCabecera}>
          <View>
            <Text style={styles.tituloSeccion}>
              Reto del entrenador
            </Text>

            <Text style={styles.retoSubtitulo}>
              ¿Quién es ese Pokémon?
            </Text>
          </View>

          <Text style={styles.retoInsignia}>
            ORIGINAL
          </Text>
        </View>

        {/* MINIJUEGO */}
        <View style={styles.retoTarjeta}>
          <View style={styles.retoPuntajes}>
            <Text style={styles.retoPuntaje}>
              🔥 Racha: {racha}
            </Text>

            <Text style={styles.retoPuntaje}>
              🏆 Récord: {record}
            </Text>
          </View>

          {/* SILUETA */}
          <View style={styles.siluetaCaja}>
            <Image
              source={{
                uri: imagenPokemon(pregunta.respuesta.id),
              }}
              style={[
                styles.siluetaImagen,
                !respondido && {
                  tintColor: '#172E60',
                },
              ]}
              resizeMode="contain"
            />

            {!respondido && (
              <Text style={styles.interrogacion}>
                ?
              </Text>
            )}
          </View>

          <Text style={styles.retoPregunta}>
            {respondido
              ? acerto
                ? '¡Correcto! 🎉'
                : '¡Casi! Sigue intentando'
              : 'Elige la respuesta correcta'}
          </Text>

          {respondido && (
            <Text style={styles.retoRespuesta}>
              Era {pregunta.respuesta.nombre}.
            </Text>
          )}

          {/* OPCIONES DE RESPUESTA */}
          <View style={styles.opciones}>
            {pregunta.opciones.map((pokemon) => {
              const esCorrecta =
                pokemon.id === pregunta.respuesta.id;

              const esElegida =
                pokemon.id === seleccion;

              const mostrarCorrecta =
                respondido && esCorrecta;

              const mostrarIncorrecta =
                respondido && esElegida && !esCorrecta;

              return (
                <Pressable
                  key={pokemon.id}
                  onPress={() => responder(pokemon.id)}
                  disabled={respondido}
                  style={[
                    styles.opcion,
                    mostrarCorrecta &&
                      styles.opcionCorrecta,
                    mostrarIncorrecta &&
                      styles.opcionIncorrecta,
                  ]}
                >
                  <Text
                    style={[
                      styles.opcionTexto,
                      (mostrarCorrecta ||
                        mostrarIncorrecta) &&
                        styles.opcionTextoMarcada,
                    ]}
                    numberOfLines={1}
                  >
                    {pokemon.nombre}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* SIGUIENTE PREGUNTA */}
          {respondido && (
            <Pressable
              style={styles.siguienteBoton}
              onPress={siguienteReto}
            >
              <Text style={styles.siguienteTexto}>
                Siguiente Pokémon →
              </Text>
            </Pressable>
          )}
        </View>

        <Text style={styles.pie}>
          POKÉDEX EXPLORER · PERFIL DE ENTRENADOR
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#EFF3FA',
  },

  contenido: {
    paddingHorizontal: 16,
    paddingBottom: 42,
  },

  portada: {
    backgroundColor: '#152B50',
    borderRadius: 23,
    padding: 21,
    overflow: 'hidden',
  },

  circuloGrande: {
    position: 'absolute',
    right: -65,
    top: -95,
    backgroundColor: '#294A82',
    width: 260,
    height: 260,
    borderRadius: 130,
  },

  sobretitulo: {
    color: '#FFD85C',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
    marginTop: 8,
  },

  perfilFila: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 21,
    gap: 14,
  },

  avatarCaja: {
    width: 100,
    height: 108,
    backgroundColor: '#FCD760',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    width: 104,
    height: 104,
    resizeMode: 'contain',
  },

  nombreCaja: {
    flex: 1,
    minWidth: 0,
  },

  campoTitulo: {
    color: '#BECEE9',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '700',
  },

  entradaNombre: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    borderBottomWidth: 1,
    borderBottomColor: '#7891B8',
    paddingVertical: 7,
  },

  botonNombre: {
    alignSelf: 'flex-start',
    backgroundColor: '#395D91',
    marginTop: 9,
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  botonNombreTexto: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  tituloSeccion: {
    fontSize: 20,
    color: '#152B50',
    fontWeight: '900',
    marginTop: 25,
    marginBottom: 13,
  },

  estadisticas: {
    flexDirection: 'row',
    gap: 12,
  },

  estadistica: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 18,
  },

  iconoEstadistica: {
    fontSize: 22,
  },

  valorEstadistica: {
    fontSize: 29,
    fontWeight: '900',
    color: '#152B50',
    marginTop: 6,
  },

  etiquetaEstadistica: {
    color: '#7587A0',
    fontSize: 12,
    marginTop: 3,
  },

  progresoCaja: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    padding: 18,
    borderRadius: 18,
  },

  progresoFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'center',
  },

  progresoTitulo: {
    color: '#152B50',
    fontWeight: '800',
    fontSize: 14,
  },

  progresoNumero: {
    color: '#315EA0',
    fontWeight: '800',
    fontSize: 12,
  },

  barraFondo: {
    height: 11,
    backgroundColor: '#DFE9F5',
    borderRadius: 9,
    marginTop: 16,
    overflow: 'hidden',
  },

  barraActual: {
    backgroundColor: '#F6C849',
    height: 11,
    borderRadius: 9,
  },

  progresoDescripcion: {
    fontSize: 11,
    lineHeight: 17,
    color: '#7A8AA1',
    marginTop: 10,
  },

  retoCabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  retoSubtitulo: {
    color: '#7B89A1',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 12,
  },

  retoInsignia: {
    color: '#315EA0',
    backgroundColor: '#DBE8F9',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.7,
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  retoTarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    alignItems: 'stretch',
  },

  retoPuntajes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },

  retoPuntaje: {
    color: '#315EA0',
    fontSize: 12,
    fontWeight: '800',
  },

  siluetaCaja: {
    height: 206,
    backgroundColor: '#E9EFF9',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    overflow: 'hidden',
  },

  siluetaImagen: {
    height: 190,
    width: 190,
  },

  interrogacion: {
    position: 'absolute',
    right: 15,
    top: 4,
    fontSize: 42,
    fontWeight: '900',
    color: '#A2B5D3',
  },

  retoPregunta: {
    fontSize: 17,
    fontWeight: '900',
    color: '#152B50',
    textAlign: 'center',
    marginTop: 19,
  },

  retoRespuesta: {
    fontSize: 13,
    color: '#667C9A',
    textAlign: 'center',
    marginTop: 6,
  },

  opciones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 14,
    gap: 9,
  },

  opcion: {
    backgroundColor: '#EDF3FC',
    width: '48%',
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#DCE6F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  opcionCorrecta: {
    backgroundColor: '#268763',
    borderColor: '#268763',
  },

  opcionIncorrecta: {
    backgroundColor: '#D85D63',
    borderColor: '#D85D63',
  },

  opcionTexto: {
    fontSize: 13,
    color: '#233A5D',
    fontWeight: '800',
    textAlign: 'center',
  },

  opcionTextoMarcada: {
    color: '#FFFFFF',
  },

  siguienteBoton: {
    backgroundColor: '#FFD24C',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },

  siguienteTexto: {
    color: '#152B50',
    fontSize: 13,
    fontWeight: '900',
  },

  pie: {
    fontSize: 10,
    color: '#92A0B4',
    textAlign: 'center',
    marginTop: 25,
    letterSpacing: 0.8,
  },
});

