import React from 'react';
import Chat from './pages/Chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

  return (
    <div className="flex flex-col items-center h-screen mytheme text-foreground bg-background">
      <Chat />
    </div >
  );
}

export default App;
