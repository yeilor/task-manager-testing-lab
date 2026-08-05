import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export function MisPruebasScreen() {
  const insets = useSafeAreaInsets();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [hobby, setHobby] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);

  return (
    <View
      className="flex-1 bg-gray-50 p-6"
      style={{
        paddingTop: insets.top + 24,
        paddingBottom: insets.bottom + 24,
      }}
    >
      <Text className="mb-2 text-3xl font-bold text-gray-900">
        Laboratorio de Pruebas
      </Text>

      <Text className="mb-6 text-base text-gray-600">
        Actividad 3
      </Text>

      <Text className="mb-2 font-semibold">Ingrese Nombre</Text>

      <TextInput
        testID="input-nombre"
        accessibilityLabel="Ingrese Nombre"
        accessibilityHint="Escriba su nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingrese Nombre"
        className="mb-4 rounded-xl border border-gray-300 bg-white p-4"
        />

      <Text className="mb-2 font-semibold">Ingrese Apellido</Text>

      <TextInput
        testID="input-apellido"
        accessibilityLabel="Ingrese Apellido"
        accessibilityHint="Escriba su apellido"
        value={apellido}
        onChangeText={setApellido}
        placeholder="Ingrese Apellido"
        className="mb-4 rounded-xl border border-gray-300 bg-white p-4"
        />

      <Text className="mb-2 font-semibold">Ingrese Hobby</Text>

      <TextInput
        testID="input-hobby"
        accessibilityLabel="Ingrese Hobby"
        accessibilityHint="Escriba su hobby"
        value={hobby}
        onChangeText={setHobby}
        placeholder="Ingrese Hobby"
        className="mb-6 rounded-xl border border-gray-300 bg-white p-4"
        />

      <Pressable
        testID="btn-guardar"
        accessibilityRole="button"
        accessibilityLabel="Guardar formulario"
        accessibilityHint="Guarda la información ingresada"
        onPress={() => {
        Keyboard.dismiss();
        setMostrarResultado(true);
        }}
        className="rounded-2xl bg-purple-600 p-4"
>
  <Text className="text-center text-lg font-bold text-white">
    Guardar
  </Text>
</Pressable>

      {mostrarResultado && (
        <View className="mt-8 rounded-xl bg-green-100 p-4">
          <Text className="text-lg font-bold text-green-700">
            Registro creado correctamente
          </Text>

          <Text className="mt-3 font-semibold">
            Nombre: {nombre}
          </Text>

          <Text className="font-semibold">
            Apellido: {apellido}
          </Text>

          <Text className="font-semibold">
            Hobby: {hobby}
          </Text>
        </View>
      )}

      <Pressable
        testID="btn-volver"
        accessibilityRole="button"
        accessibilityLabel="Volver al menú principal"
        accessibilityHint="Regresa a la pantalla principal"
        onPress={() => router.push('/')}
        className="mt-6 rounded-2xl bg-purple-700 p-4"
>
  <Text className="text-center text-lg font-bold text-white">
    ⬅ Volver al menú principal
  </Text>
</Pressable>
    </View>
  );
}