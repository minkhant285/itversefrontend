import "antd/dist/antd.min.css";
import { AppProvider } from "./providers/appProvider";

import AppRoutes from "./routes/Routes";

function App() {
    return (
        <div className="App">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
            >
                <AppProvider>
                    <AppRoutes />
                </AppProvider>
            </div>
        </div>
    );
}

export default App;
