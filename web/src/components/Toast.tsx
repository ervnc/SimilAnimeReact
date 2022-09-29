import { Warning } from 'phosphor-react';
import * as Toast from '@radix-ui/react-toast';


const ToastDemo = () => {
  return (
    <Toast.Provider duration={3000}>
        dwadwdwadwa
      <Toast.Root>
        <Toast.Title>Wrong username/password.</Toast.Title>
        <Toast.Action asChild altText="Error">
            <Warning size={32} color="#ff1100" />
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
};

export default ToastDemo;
