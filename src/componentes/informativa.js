
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const artwork = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export default function Informativa() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const posterWidth = Math.min(width - 28, 440);
  const scale = posterWidth / 375;

  return (
    <View style={styles.screen}>
      <StatusBar
        style="light"
        backgroundColor="#0A1634"
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 16) + 12,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.poster,
            { width: posterWidth },
          ]}
        >

          {/* FONDO DECORATIVO */}
          <View style={styles.glowPurple} />
          <View style={styles.glowBlue} />
          <View style={styles.glowRed} />
          <View style={styles.glowYellow} />

          <View style={styles.diagonalOne} />
          <View style={styles.diagonalTwo} />

          {/* ENCABEZADO */}
          <View style={styles.topBar}>
            <Text style={styles.topLabel}>
              EXPLORA · DESCUBRE · COLECCIONA
            </Text>

            <Text style={styles.topEdition}>
              EDICIÓN 01
            </Text>
          </View>

          {/* TÍTULO PRINCIPAL */}
          <View style={styles.titleContainer}>
            <Text style={styles.overline}>
              DESCUBRE EL UNIVERSO
            </Text>

            <Text
              style={[
                styles.mainTitle,
                { fontSize: 69 * scale },
              ]}
            >
              POKÉ
            </Text>

            <View style={styles.apiRow}>
              <Text
                style={[
                  styles.secondTitle,
                  { fontSize: 69 * scale },
                ]}
              >
                API
              </Text>

              <View style={styles.titleBadge}>
                <Text style={styles.titleBadgeText}>
                  EXPLORER
                </Text>
              </View>
            </View>

            <Text style={styles.heroDescription}>
              Tu aventura Pokémon comienza aquí.
            </Text>
          </View>

          {/* ILUSTRACIONES POKÉMON */}
          <View
            style={[
              styles.heroArtwork,
              { height: 295 * scale },
            ]}
          >
            <View
              style={[
                styles.heroHalo,
                {
                  width: 245 * scale,
                  height: 245 * scale,
                  borderRadius: 125 * scale,
                  top: 18 * scale,
                  left: 65 * scale,
                },
              ]}
            />

            <View
              style={[
                styles.heroRing,
                {
                  width: 275 * scale,
                  height: 275 * scale,
                  borderRadius: 145 * scale,
                  top: 3 * scale,
                  left: 49 * scale,
                },
              ]}
            />

            {/* CHARIZARD */}
            <Image
              source={{ uri: artwork(6) }}
              style={[
                styles.pokemonImage,
                {
                  width: 198 * scale,
                  height: 222 * scale,
                  left: 184 * scale,
                  top: 1 * scale,
                  zIndex: 1,
                },
              ]}
              resizeMode="contain"
              accessibilityLabel="Charizard"
            />

            {/* BULBASAUR */}
            <Image
              source={{ uri: artwork(1) }}
              style={[
                styles.pokemonImage,
                {
                  width: 143 * scale,
                  height: 155 * scale,
                  left: -4 * scale,
                  bottom: 3 * scale,
                  zIndex: 3,
                },
              ]}
              resizeMode="contain"
              accessibilityLabel="Bulbasaur"
            />

            {/* PIKACHU */}
            <Image
              source={{ uri: artwork(25) }}
              style={[
                styles.pokemonImage,
                {
                  width: 206 * scale,
                  height: 224 * scale,
                  left: 96 * scale,
                  bottom: 4 * scale,
                  zIndex: 4,
                },
              ]}
              resizeMode="contain"
              accessibilityLabel="Pikachu"
            />

            {/* DESTELLOS */}
            <View
              style={[
                styles.spark,
                {
                  top: 44 * scale,
                  left: 30 * scale,
                },
              ]}
            >
              <Text style={styles.sparkText}>
                ✦
              </Text>
            </View>

            <View
              style={[
                styles.spark,
                {
                  bottom: 33 * scale,
                  right: 15 * scale,
                },
              ]}
            >
              <Text style={styles.sparkText}>
                ✦
              </Text>
            </View>
          </View>

          {/* SECCIÓN INFORMATIVA */}
          <View style={styles.informationSection}>
            <View style={styles.sectionAccent} />

            <Text style={styles.infoOverline}>
              EL MUNDO POKÉMON EN TUS MANOS
            </Text>

            <Text style={styles.infoTitle}>
              1.025 Pokémon por descubrir
            </Text>

            <Text style={styles.infoDescription}>
              Explora la Pokédex, busca por nombre
              o número, filtra por tipos y conoce
              las características de cada Pokémon.
            </Text>

            <Text style={styles.infoDescription}>
              Guarda tus favoritos, amplía tu colección
              y descubre nuevas especies en cada aventura.
            </Text>

            {/* FUNCIONALIDADES */}
            <View style={styles.featureRow}>
              <View style={styles.feature}>
                <Text style={styles.featureText}>
                  POKÉDEX
                </Text>
              </View>

              <View style={styles.feature}>
                <Text style={styles.featureText}>
                  FAVORITOS
                </Text>
              </View>

              <View style={styles.feature}>
                <Text style={styles.featureText}>
                  COLECCIÓN
                </Text>
              </View>

              <View style={styles.feature}>
                <Text style={styles.featureText}>
                  ENTRENADOR
                </Text>
              </View>
            </View>
          </View>

          {/* PIE DE PÁGINA */}
          <View style={styles.footer}>
            <View style={styles.footerLine} />

            <Text style={styles.footerProject}>
              DESARROLLADO CON REACT NATIVE + EXPO
            </Text>

            <Text style={styles.footerGithub}>
              github.com/andresjaimer-sys/Expoapi
            </Text>

            <Text style={styles.footerVersion}>
              VERSIÓN 1.0.0 · POKÉDEX EXPLORER
            </Text>
          </View>
        </View>

        <Text style={styles.bottomNote}>
          Información proporcionada por PokéAPI.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0A1634',
  },

  scrollContent: {
    paddingBottom: 36,
    alignItems: 'center',
  },

  poster: {
    backgroundColor: '#203873',
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#4565A2',
    paddingTop: 22,
  },

  // FONDO
  glowPurple: {
    position: 'absolute',
    width: 310,
    height: 310,
    borderRadius: 155,
    backgroundColor: '#533A95',
    top: -100,
    right: -140,
    opacity: 0.55,
  },

  glowBlue: {
    position: 'absolute',
    width: 310,
    height: 310,
    borderRadius: 155,
    backgroundColor: '#1476BA',
    top: 210,
    left: -175,
    opacity: 0.42,
  },

  glowRed: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 110,
    backgroundColor: '#D9454A',
    top: 330,
    right: -120,
    opacity: 0.6,
  },

  glowYellow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#EAAE32',
    top: 255,
    left: 130,
    opacity: 0.14,
  },

  diagonalOne: {
    position: 'absolute',
    width: 80,
    height: 650,
    backgroundColor: '#FFFFFF',
    opacity: 0.035,
    top: -80,
    left: 160,
    transform: [{ rotate: '29deg' }],
  },

  diagonalTwo: {
    position: 'absolute',
    width: 30,
    height: 650,
    backgroundColor: '#FFD34E',
    opacity: 0.09,
    top: -80,
    left: 285,
    transform: [{ rotate: '29deg' }],
  },

  // ENCABEZADO
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    alignItems: 'center',
  },

  topLabel: {
    fontSize: 9,
    letterSpacing: 1.3,
    color: '#D5E1FF',
    fontWeight: '800',
    flexShrink: 1,
  },

  topEdition: {
    color: '#FFDB63',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '800',
    marginLeft: 8,
  },

  titleContainer: {
    paddingHorizontal: 23,
    marginTop: 30,
    zIndex: 2,
  },

  overline: {
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '800',
    color: '#FFD44F',
    marginBottom: 5,
  },

  mainTitle: {
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -3,
    lineHeight: 73,
    textShadowColor: 'rgba(0,0,0,0.27)',
    textShadowOffset: {
      width: 3,
      height: 4,
    },
    textShadowRadius: 8,
  },

  apiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -9,
  },

  secondTitle: {
    color: '#FFDA4A',
    fontWeight: '900',
    letterSpacing: -3,
    lineHeight: 76,
    textShadowColor: 'rgba(0,0,0,0.28)',
    textShadowOffset: {
      width: 3,
      height: 4,
    },
    textShadowRadius: 8,
  },

  titleBadge: {
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: 7,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginLeft: 17,
    transform: [{ rotate: '-6deg' }],
  },

  titleBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },

  heroDescription: {
    color: '#EEF4FF',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 8,
  },

  // ILUSTRACIONES
  heroArtwork: {
    position: 'relative',
    width: '100%',
    marginTop: 5,
  },

  heroHalo: {
    position: 'absolute',
    backgroundColor: '#F7CC48',
    opacity: 0.16,
  },

  heroRing: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.27)',
  },

  pokemonImage: {
    position: 'absolute',
  },

  spark: {
    position: 'absolute',
    zIndex: 5,
  },

  sparkText: {
    color: '#FFDF65',
    fontSize: 34,
    fontWeight: 'bold',
  },

  // INFORMACIÓN
  informationSection: {
    backgroundColor: 'rgba(11,24,57,0.92)',
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 29,
    borderTopWidth: 1,
    borderTopColor: '#5672A8',
  },

  sectionAccent: {
    width: 45,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#FFD44F',
    marginBottom: 19,
  },

  infoOverline: {
    color: '#FFD44F',
    fontSize: 9,
    letterSpacing: 1.4,
    fontWeight: '900',
  },

  infoTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 9,
    lineHeight: 32,
  },

  infoDescription: {
    color: '#C6D5EE',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 13,
  },

  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 22,
  },

  feature: {
    borderWidth: 1,
    borderColor: '#5370A3',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(46,75,127,0.45)',
  },

  featureText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
  },

  // CRÉDITOS
  footer: {
    backgroundColor: '#122249',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 23,
  },

  footerLine: {
    height: 1,
    backgroundColor: '#3C5283',
    width: '90%',
    marginBottom: 18,
  },

  footerProject: {
    color: '#FFFFFF',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '800',
    textAlign: 'center',
  },

  footerGithub: {
    color: '#FFD44F',
    fontSize: 11,
    marginTop: 10,
    textAlign: 'center',
  },

  footerVersion: {
    color: '#98ACD2',
    fontSize: 9,
    letterSpacing: 0.7,
    marginTop: 12,
  },

  bottomNote: {
    color: '#7E91B9',
    fontSize: 11,
    marginTop: 18,
    textAlign: 'center',
  },
});
