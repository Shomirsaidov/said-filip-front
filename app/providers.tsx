import { ThemeProvider } from "next-themes";
import { ReduxProvider } from "@/redux/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
