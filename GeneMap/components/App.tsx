import { ThemeProvider } from "next-themes"
import GeneEssentialityMap from "./components/GeneEssentialityMap"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <GeneEssentialityMap />
      </div>
    </ThemeProvider>
  )
}

export default App

