import React from 'react';
import * as d3 from "d3";
import ReactDOM from 'react-dom'


class ScoreChart extends React.Component {

    constructor(props) {
        super(props)
        this.max_flexible = 30
        this.max_fixed = 50
        this.max_savings = 20
        this.outer_radius = 100
        this.canvas_width = 300
        this.canvas_heigth = 300
        this.inner_radius = this.outer_radius - 6
    }

    componentDidMount = (nextProps) => {

        const {fixedScore, flexibleScore, savingsScore} = this.props
        const data = [flexibleScore, this.max_flexible - flexibleScore, savingsScore, this.max_savings - savingsScore, fixedScore, this.max_fixed - fixedScore]
        this.createChart(data)
    }
    createChart = (data) => {
        const reverse_data = data.slice().reverse()
        let canvas = d3.select(ReactDOM.findDOMNode(this.refs.graph)).append("svg")
        .attr("width", this.canvas_width)
        .attr("height", this.canvas_width)
    let group = canvas.append("g").attr("transform", "translate(150,150)")
    let arc = d3.arc()
        .innerRadius(this.inner_radius)
        .outerRadius(this.outer_radius)
        .padAngle(0.015)
        .cornerRadius(2)
    let pie = d3.pie().sort(null)(data)
    const colors = ['red', 'grey', 'blue', 'grey', 'green', 'grey']
    group.datum(data).selectAll('path')
            .data(pie)
          .enter().append('path')
            .attr('fill', (d, i) => colors[i] )
            .attr('d', arc)
    group.append('circle')
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 70)
        .attr("fill", "lightblue")
    group.append('circle')
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 65)
        .attr("fill", "white")
    group.append('circle')
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 60)
        .attr("fill", "lightblue")
    group.append("text")
        .attr("x", 0)
        .attr("y", 20)

        .style("font-size", "70px")
        .style("font-family", "Hind")
        .style("font-weight", "300px")
        .attr("text-anchor", "middle")
        .style("fill", "rgba(255,255,255,1)")
        .text(this.props.currentScore);

        let total
        for(let i in reverse_data) {

            let X_coord, Y_coord, circle_color
            let avg_radius = (this.outer_radius + this.inner_radius) / 2

            switch(parseInt(i)){
                case 0:
                    total = reverse_data[0]
                    X_coord = Math.cos((total * 3.6 + 90) * Math.PI / 180) * avg_radius
                    Y_coord = - Math.sin((total * 3.6 + 90) * Math.PI / 180 ) * avg_radius
                    circle_color = "green"
                break
                case 2:
                     total = total + reverse_data[1] + reverse_data[2]
                     X_coord = Math.cos((total * 3.6 + 90) * Math.PI / 180) * avg_radius
                     Y_coord = - Math.sin((total * 3.6 + 90) * Math.PI / 180 ) * avg_radius
                     circle_color = "blue"
                break
                case 4:
                     total = total + reverse_data[3] + reverse_data[4]
                     X_coord = Math.cos((total * 3.6 + 90) * Math.PI / 180) * avg_radius
                     Y_coord = - Math.sin((total * 3.6 + 90) * Math.PI / 180 ) * avg_radius
                     circle_color = "red"
                break

            }
            if(parseInt(i) === 0 || parseInt(i) === 2 || parseInt(i) === 4) {
                group.append('circle')
                    .attr("cx", X_coord)
                    .attr("cy", Y_coord)
                    .attr("r", 12)
                    .attr("fill", circle_color)

                group.append('text')
                    .attr("x", X_coord)
                    .attr("y", Y_coord + 5)
                    .text(reverse_data[+i+1])
                    .attr("text-anchor", "middle")
                    .style("fill", "white")
            }

        }
    }
    render(){
        return (
            <div ref = "graph"></div>
        )
    }
}

export default ScoreChart
