import { setupServer } from 'msw/node';
import { handlersActividad3 } from './handlersActividad3';

export const server = setupServer(...handlersActividad3 );
