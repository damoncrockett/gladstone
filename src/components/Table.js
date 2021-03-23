import React, { Component } from 'react';
import { select } from 'd3-selection';

/* screen width awareness  */
const screenW = window.screen.width * window.devicePixelRatio;
const summaryWidth = screenW / 2;
const titleWidth = screenW / 4;
const notesWidth = screenW / 4;

class Table extends Component {
  constructor(props) {
    super(props);

    this.drawTable = this.drawTable.bind(this);
    this.drawColumns = this.drawColumns.bind(this);
  }

  componentDidMount() {
    this.drawColumns();
  }

  componentDidUpdate(prevProps, prevState) {
    // conditional prevents infinite loop
    if (prevProps.data !== this.props.data) {
      this.drawTable();
    }

    if (prevProps.sortVar !== this.props.sortVar) {
      this.drawTable();
    }
  }

  drawColumns() {
    select('div.dataTable')
      .selectAll('div.title')
      .data([0])
      .enter()
      .append('div')
      .attr('class','title')

    select('div.dataTable')
      .selectAll('div.imthumb')
      .data([0])
      .enter()
      .append('div')
      .attr('class','imthumb')

    select('div.dataTable')
      .selectAll('div.notes')
      .data([0])
      .enter()
      .append('div')
      .attr('class','notes')

    select('div.dataTable')
      .selectAll('div.summary')
      .data([0])
      .enter()
      .append('div')
      .attr('class','summary')
  }

  drawTable() {
    select('div.dataTable')
      .select('div.title')
      .selectAll('div')
      .data(this.props.data)
      .enter()
      .append('div')
      .html(d => "<p>" + "<a href=" + d.itemurl + " target='_blank'>" + "<span>" + d.title + "</span>" + "</a>" + "<br/><br/>" + d.cpdate + "<br/><br/><b>" + d.creator + "</b></p>")

    select('div.dataTable')
      .select('div.title')
      .selectAll('div')
      .data(this.props.data)
      .html(d => "<p>" + "<a href=" + d.itemurl + " target='_blank'>" + "<span>" + d.title + "</span>" + "</a>" + "<br/><br/>" + d.cpdate + "<br/><br/><b>" + d.creator + "</b></p>")

    select('div.dataTable')
      .select('div.imthumb')
      .selectAll('div.thumb')
      .data(this.props.data)
      .enter()
      .append('div')
      .attr('class','thumb')
      .html(d => "<a href=" + d.fullsize + " target='_blank'>" + "<img src=" + d.imgpath + ">" + "</a>")
      //.html(d => "<a href=" + "http://localhost:8888/" + d.fullsize + " target='_blank'>" + "<img src=" + "http://localhost:8888/" + d.imgpath + ">" + "</a>")

    select('div.dataTable')
      .select('div.imthumb')
      .selectAll('div.thumb')
      .data(this.props.data)
      .html(d => "<a href=" + d.fullsize + " target='_blank'>" + "<img src=" + d.imgpath + ">" + "</a>")
      //.html(d => "<a href=" + "http://localhost:8888/" +  d.fullsize + " target='_blank'>" + "<img src=" + "http://localhost:8888/" + d.imgpath + ">" + "</a>")

    select('div.dataTable')
      .select('div.notes')
      .selectAll('div')
      .data(this.props.data)
      .enter()
      .append('div')
      .html(d => "<p>" + d.notes + "</p>")

    select('div.dataTable')
      .select('div.notes')
      .selectAll('div')
      .data(this.props.data)
      .html(d => "<p>" + d.notes + "</p>")

    select('div.dataTable')
      .select('div.summary')
      .selectAll('div')
      .data(this.props.data)
      .enter()
      .append('div')
      .html(d => "<p>" + d.summary + "</p>")

    select('div.dataTable')
      .select('div.summary')
      .selectAll('div')
      .data(this.props.data)
      .html(d => "<p>" + d.summary + "</p>")

  }

  render() {
    return (
      <div className='dataTable'>
      </div>
    );
  }
}

export default Table;
