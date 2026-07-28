import { renderHook, act } from '@testing-library/react-native';
import { useTaskList } from '../../src/hooks/useTaskList';

describe('useTaskList', () => {
  it('inicia con una lista vacía por defecto', async () => {
    const { result } = await renderHook(() => useTaskList());
    expect(result.current.tasks).toEqual([]);
    expect(result.current.taskCount).toBe(0);
    expect(result.current.error).toBeNull();
  });

  it('agrega una tarea correctamente', async () => {
    const { result } = await renderHook(() => useTaskList());
    await act(() => {
      result.current.addTask('Nueva tarea');
    });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Nueva tarea');
    expect(result.current.tasks[0].status).toBe('pending');
    expect(result.current.error).toBeNull();
  });

  it('establece un error cuando el título está vacío', async () => {
    const { result } = await renderHook(() => useTaskList());
    await act(() => {
      result.current.addTask('');
    });
    expect(result.current.tasks).toHaveLength(0);
    expect(result.current.error).toBe('El título no puede estar vacío');
  });

  it('limpia el error al agregar una tarea válida después de un error', async () => {
    const { result } = await renderHook(() => useTaskList());
    await act(() => {
      result.current.addTask('');
    });
    expect(result.current.error).not.toBeNull();

    await act(() => {
      result.current.addTask('Tarea válida');
    });
    expect(result.current.error).toBeNull();
    expect(result.current.tasks).toHaveLength(1);
  });

  it('elimina una tarea por su id', async () => {
    const initialTasks = [
      { id: '1', title: 'Tarea 1', status: 'pending' as const },
      { id: '2', title: 'Tarea 2', status: 'completed' as const },
    ];
    const { result } = await renderHook(() => useTaskList(initialTasks));
    await act(() => {
      result.current.removeTask('1');
    });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].id).toBe('2');
  });

  // Nuevas Pruebas

  it('agrega varias tareas conservando el orden', async () => {
  const { result } = await renderHook(() => useTaskList());

  await act(() => {
    result.current.addTask('Primera tarea');
    result.current.addTask('Segunda tarea');
    result.current.addTask('Tercera tarea');
  });

  expect(result.current.tasks).toHaveLength(3);
  expect(result.current.tasks[0].title).toBe('Primera tarea');
  expect(result.current.tasks[1].title).toBe('Segunda tarea');
  expect(result.current.tasks[2].title).toBe('Tercera tarea');
});

it('no modifica la lista cuando intenta eliminar un id inexistente', async () => {
  const initialTasks = [
    { id: '1', title: 'Tarea 1', status: 'pending' as const },
    { id: '2', title: 'Tarea 2', status: 'completed' as const },
  ];

  const { result } = await renderHook(() => useTaskList(initialTasks));

  await act(() => {
    result.current.removeTask('999');
  });

  expect(result.current.tasks).toHaveLength(2);
  expect(result.current.tasks[0].id).toBe('1');
  expect(result.current.tasks[1].id).toBe('2');
});

});
