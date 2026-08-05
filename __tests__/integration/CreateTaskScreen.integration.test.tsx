import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { http, HttpResponse } from 'msw';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { server } from '../../src/mocks/server';
import { CreateTaskScreen } from '../../src/screens/CreateTaskScreen';

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const renderScreen = () =>
  render(
    <SafeAreaProvider initialMetrics={metrics}>
      <CreateTaskScreen />
    </SafeAreaProvider>
  );

describe('CreateTaskScreen - Pruebas de integración propias', () => {
  // Limpiamos el almacenamiento antes de cada prueba, para que ninguna
  // arranque con datos "pegados" de la prueba anterior.
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('escenario de éxito: crea una tarea y la muestra en la lista', async () => {
    await renderScreen();

    await fireEvent.changeText(
  screen.getByPlaceholderText('Escribe el título de la tarea'),
  'Comprar materiales para el proyecto'
);
await fireEvent.press(screen.getByText('Guardar'));

    // Esperamos el mensaje de confirmación
    await waitFor(() => {
      expect(screen.getByText('Tarea creada exitosamente')).toBeTruthy();
    });

    // Además, verificamos que la tarea realmente aparezca en la lista
    expect(screen.getByText('Comprar materiales para el proyecto')).toBeTruthy();
  });

  it('escenario de error: la API falla y se muestra el mensaje de error', async () => {
    // Reemplazamos temporalmente la respuesta del "servidor falso"
    // para que esta vez devuelva un error 500 (fallo del servidor)
    server.use(
      http.post('https://api.taskmanager.com/tasks', () =>
        new HttpResponse(null, { status: 500 })
      )
    );

    await renderScreen();

    await fireEvent.changeText(
  screen.getByPlaceholderText('Escribe el título de la tarea'),
  'Tarea que va a fallar'
);
    await fireEvent.press(screen.getByText('Guardar'));

    await waitFor(() => {
      expect(screen.getByText('Error al crear la tarea')).toBeTruthy();
    });

    // La tarea NO debe quedar guardada ni visible en la lista
    expect(screen.queryByText('Tarea que va a fallar')).toBeNull();
  });

  it('escenario de datos vacíos: muestra el mensaje de lista vacía al no haber tareas', async () => {
    await renderScreen();

    // Como AsyncStorage está limpio (gracias al beforeEach) y todavía
    // no se creó ninguna tarea, la pantalla debe mostrar el estado vacío.
    await waitFor(() => {
      expect(screen.getByText('No hay tareas aún')).toBeTruthy();
    });
  });
});