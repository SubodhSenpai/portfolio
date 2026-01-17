import { ThemeProvider } from '@/context/ThemeContext';
import Terminal from '@/component/Terminal';

export default function Page() {
  return (
    <ThemeProvider>
      <Terminal />
    </ThemeProvider>
  );
}
