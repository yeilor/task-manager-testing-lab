import { renderHook, act } from '@testing-library/react-native';
import { useCreateTask } from '../../src/hooks/useCreateTask';
import { createTask } from '../../src/services/taskService';

// Se mockea createTask para aislar el hook de la llamada real al servicio
jest.mock('../../src/services/taskService');

describe('useCreateTask', () => {
  it('inicia en estado idle', async () => {
    const { result } = await renderHook(() => useCreateTask());
    expect(result.current.status).toBe('idle');
  });

  it('pasa a loading y luego a success cuando createTask resuelve bien', async () => {
    (createTask as jest.Mock).mockResolvedValueOnce({ id: '1', title: 'Test' });
    const { result } = await renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit('Nueva tarea');
    });

    expect(result.current.status).toBe('success');
  });

  it('pasa a error cuando createTask falla', async () => {
    (createTask as jest.Mock).mockRejectedValueOnce(new Error('Fallo de red'));
    const { result } = await renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit('Nueva tarea');
    });

    expect(result.current.status).toBe('error');
  });
});