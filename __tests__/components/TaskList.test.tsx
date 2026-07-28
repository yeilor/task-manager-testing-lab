import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskList } from '../../src/components/TaskList';

const mockTask = { id: '1', title: 'Tarea 1', status: 'pending' as const };
const anotherTask = { id: '2', title: 'Tarea 2', status: 'completed' as const };

describe('TaskList', () => {
  it('muestra un mensaje cuando la lista está vacía', async () => {
    await render(<TaskList tasks={[]} />);
    expect(screen.getByText('No hay tareas aún')).toBeTruthy();
  });

  it('no muestra el mensaje de lista vacía cuando hay tareas', async () => {
    await render(<TaskList tasks={[mockTask]} />);
    expect(screen.queryByText('No hay tareas aún')).toBeNull();
  });

  it('muestra el contador de tareas correctamente', async () => {
    await render(<TaskList tasks={[mockTask, anotherTask]} />);
    expect(screen.getByText('2 tareas')).toBeTruthy();
  });

  //Nuevas Pruebas

  it('muestra "1 tarea" cuando existe una sola tarea', async () => {
    await render(<TaskList tasks={[mockTask]} />);

    expect(screen.getByText('1 tarea')).toBeTruthy();
});

it('renderiza todas las tareas de la lista', async () => {
  await render(<TaskList tasks={[mockTask, anotherTask]} />);

  expect(screen.getByText('Tarea 1')).toBeTruthy();
  expect(screen.getByText('Tarea 2')).toBeTruthy();
});

});
