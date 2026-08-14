import { TaskSchema, TaskListSchema } from '../schemas/taskSchema';

describe('Contrato de API - TaskSchema', () => {
  it('valida correctamente una respuesta con el formato esperado (caso válido)', () => {
    const respuestaValida = {
      id: '1786577366429',
      title: 'Prueba',
      status: 'pending',
      createdAt: '2026-08-12T18:30:00.000Z',
    };

    const resultado = TaskSchema.safeParse(respuestaValida);

    expect(resultado.success).toBe(true);
  });

  it('rechaza una respuesta que no cumple el contrato (caso inválido)', () => {
    const respuestaInvalida = {
      id: 123, // debería ser string, no number
      title: '', // no puede estar vacío
      status: 'en_proceso', // valor no permitido (solo 'pending' | 'completed')
    };

    const resultado = TaskSchema.safeParse(respuestaInvalida);

    expect(resultado.success).toBe(false);
  });

  it('valida correctamente una lista de tareas (GET /tasks)', () => {
    const listaValida = [
      { id: '1', title: 'Tarea A', status: 'pending' },
      { id: '2', title: 'Tarea B', status: 'completed' },
    ];

    const resultado = TaskListSchema.safeParse(listaValida);

    expect(resultado.success).toBe(true);
  });
});