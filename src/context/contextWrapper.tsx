import { userContext } from './userContext';
import { useState } from 'react';

export const ContextWrapper = ({ children, navigation }) => {
  const [user, setUser] = useState(navigation);

  return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
};
