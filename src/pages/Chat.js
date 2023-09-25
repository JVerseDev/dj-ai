import ChatContainer from "../containers/ChatContainer";
import SideBar from "../containers/SideBar";
function Chat() {
    return (
        <div className="chat-page flex flex-row w-full h-full">
            <SideBar />
            <ChatContainer />
        </div>
    )
}

export default Chat