import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

import './styles.css'

const App = () => {
  const dataset = [
    [12, 6, 7, 23, 10, 14, 17],
    [3, 19, 36, 17, 20],
    [17, 8, 5, 13]
  ]

  const [data, setData] = useState(dataset[0])

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <h2>D3 React Hooks</h2>
      <BarChart id="barchart" data={data} />
      <div>
        <button id="data1" onClick={() => setData(dataset[0])}>
          Data 1
        </button>
        <button id="data2" onClick={() => setData(dataset[1])}>
          Data 2
        </button>
        <button id="data3" onClick={() => setData(dataset[2])}>
          Data 3
        </button>
      </div>
    </div>
  )
}

const BarChart = ({ id, data, width = 550, height = 300 }) => {
  useEffect(() => {
    drawBar()
  }, [data])

  const drawBar = () => {
    const t = d3.transition().duration(1000)
    const colors = d3.scaleOrdinal(d3.schemeCategory10)
    const svg = d3.select('svg')

    let bars = svg.selectAll('rect').data(data, d => d)

    // exit : les barres qui vont etre supprimées
    // on supprime avec une animation du haut vers 0
    bars
      .exit()
      .transition(t)
      .attr('y', height)
      .attr('height', 0)
      .remove()

    // enter : ici on mets les données qui ne dépendent pas de Data
    // ou presque :) j'ai ajouté y et x à cause de l'animation
    let enter = bars
      .enter()
      .append('rect')
      .attr('width', 65)
      .attr('y', height)
      .attr('x', (d, i) => i * 70)

    // enter + update
    bars = enter
      .merge(bars)
      .attr('fill', d => colors(d))
      .transition(t)
      .attr('x', (d, i) => i * 70)
      .attr('y', d => height - 10 * d)
      .attr('height', d => d * 10)
  }

  return <svg width={width} height={height} id={id} />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
