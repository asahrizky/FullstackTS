import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 3000,
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "white",
            },
          },
        }}
      />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
