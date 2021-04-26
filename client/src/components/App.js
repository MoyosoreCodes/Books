import React from 'react'
import Join  from './chat/Join'
import Chat from './chat/Chat'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

function App() {
    return (
        <Router>
            <Route path="/" exact component={Join}/>
            <Route path="/chat"  component={Chat}/>
        </Router>
    )
}

export default App
