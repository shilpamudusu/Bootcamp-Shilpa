import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '../server/api/root';  // Update this path based on where your router file is

export const api = createTRPCReact<AppRouter>();
