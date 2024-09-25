import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import NavBar from '../components/NavBar';

export const metadata = {
  title: 'Plant Identifier',
  description: 'Identify plants using AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CssVarsProvider>
        <CssBaseline />
        <body>
          <NavBar />
          <main>{children}</main>
        </body>
      </CssVarsProvider>
    </html>
  )
}