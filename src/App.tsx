import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Landing from "@/pages/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "#0a0d12",
            border: "1px solid #0ccfb033",
            color: "#e2faf8",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
