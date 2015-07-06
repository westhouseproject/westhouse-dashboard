export default class Control {

  constructor() {
    this.state = {
      forId: Math.random() * 10000
    };
  }

  render() {
    const id = `myonoffswitch-${this.state.forId}`;
    return (
      <div className='switch'>
        <div className='onoffswitch'>
          <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id={id} />
          <label className="onoffswitch-label" htmlFor={id}>
            <span className="onoffswitch-inner"></span>
            <span className="onoffswitch-switch"></span>
          </label>
        </div>
        <div className='span'>
          <span>{this.props.caption}</span>
        </div>
      </div>
    );
  }
}
