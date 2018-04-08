import React from 'react';
import ScoreChart from './ScoreChart'

class App extends React.Component {

    constructor(props) {
        super(props)
    }
    render(){
        const scoreData = {score: 60, currentScore: 60, fixedScore: 32, flexibleScore: 10, savingsScore: 18}
        return (
            <ScoreChart {...scoreData}/>
        )
    }
}
export default App
