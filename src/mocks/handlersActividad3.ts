import { http, HttpResponse } from 'msw';
import { Task } from '../types';

const API_URL = 'https://api.taskmanager.com';

// Almacena las tareas simuladas utilizadas durante las pruebas
let tareasSimuladas: Task[] = [];

// Reinicia las tareas simuladas antes de cada prueba
export const limpiarTareas = () => {
  tareasSimuladas = [];
};

export const handlersActividad3 = [
  // Devuelve todas las tareas simuladas
  http.get(`${API_URL}/tasks`, () => {
    return HttpResponse.json(tareasSimuladas, { status: 200 });
  }),

  // Crea una nueva tarea simulada
  http.post(`${API_URL}/tasks`, async ({ request }) => {
    const { title } = (await request.json()) as { title: string };

    const nuevaTarea: Task = {
      id: Date.now().toString(),
      title,
      status: 'pending',
    };

    tareasSimuladas.unshift(nuevaTarea);

    return HttpResponse.json(nuevaTarea, { status: 201 });
  }),
];