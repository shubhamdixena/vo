import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import "./styles/fonts.css"

document.head.insertAdjacentHTML(
  "beforeend",
  `
  <meta name="description" content="charity: water is a non-profit organization bringing clean and safe drinking water to people in developing countries.">
  <title>charity: water</title>
  <link rel="icon" href="https://www.charitywater.org/static/favicon-12a2b1d904b71a6d50e1c55af138784b.ico" />
`,
)

createRoot(document.getElementById("root")!).render(<App />)
