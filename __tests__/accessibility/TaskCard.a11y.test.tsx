import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskCard } from '../../src/components/TaskCard';

const mockTask = {
  id: '1',
  title: 'Estudiar accesibilidad',
  status: 'pending' as const,
};

describe('TaskCard - Accesibilidad', () => {
  it('el botón de eliminar tiene un accessibilityLabel descriptivo', async () => {
    await render(<TaskCard task={mockTask} onDelete={jest.fn()} />);
    const deleteButton = screen.getByLabelText('Eliminar tarea Estudiar accesibilidad');
    expect(deleteButton).toBeTruthy();
  });

  it('los controles de la tarjeta son botones enfocables por separado', async () => {
    await render(<TaskCard task={mockTask} onDelete={jest.fn()} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('el estado de la tarea es anunciado al lector de pantalla', async () => {
    await render(<TaskCard task={mockTask} onDelete={jest.fn()} />);
    expect(screen.getByText('○ Pendiente')).toBeTruthy();
  });
  //Nuevas pruebas para el punto 4 de la actividad 3:
  //Escribir al menos 2 pruebas con jest-native que verifiquen propiedades accesibles de componentes
  //(por ejemplo, que los botones tengan accessibilityLabel, que los campos de texto tengan roles accesibles).
  it('el botón para cambiar el estado tiene un accessibilityLabel descriptivo', async () => {
  await render(<TaskCard task={mockTask} onDelete={jest.fn()} />);

  expect(
    screen.getByLabelText(
      'Marcar tarea Estudiar accesibilidad como completada'
    )
  ).toBeTruthy();
});
  it('el botón para cambiar el estado tiene el rol de botón', async () => {
  await render(<TaskCard task={mockTask} onDelete={jest.fn()} />);

  expect(screen.getAllByRole('button')).toHaveLength(2);
});
});
