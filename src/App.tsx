/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MainDashboard from "./components/MainDashboard";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  return (
    <div id="app-root" className="min-h-screen font-sans selection:bg-gray-900 selection:text-white">
      <MainDashboard />
      <ChatWindow />
    </div>
  );
}

