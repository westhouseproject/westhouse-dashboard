import { controls as controlsStyle } from './Controls.less';
import Switch from './Switch';

export default class Controls {
  render() {
    return (
      <div className={controlsStyle}>
        <Switch caption="Living Room" />
        <Switch caption="Kitchen" />
        <Switch caption="Bedroom" />
      </div>
    );
  }
}
