import { useChatStore } from "../store/useChatStore.js";
import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  if (import.meta.env.MODE === "development") {
    console.log("Selected user in HomePage:", selectedUser);
  }

  return (
    <div className="h-screen bg-base-200 flex flex-col">
    {/* Add padding to account for the Navbar */}
    <div className="flex-1 flex items-center justify-center mt-16">
      <div className="w-full max-w-6xl h-[calc(100vh-4rem)] bg-base-100 rounded-lg shadow-xl flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 sm:w-1/4 md:w-1/5 h-full border-r  overflow-y-auto">
          <Sidebar />
        </div>

        {/* Chat container */}
        <div className="flex-1 h-full flex flex-col overflow-hidden">
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  </div>
  );
};

export default HomePage;
