export default class Bar {
  render() {
    return (
      <rect
        width={this.props.width}
        height={this.props.height}
        transform={`translate(${this.props.x}, ${this.props.y})`}/>
    );
  }
}
