import { loaderContainer as loaderStyle } from './LoadingIndicator.less';
import { Loader } from 'react-loaders';
import { getRandomAnimationKey } from '../../loadingAnimationList';

export default class LoadingIndicator {
  static defaultProps = {
    animationKey: getRandomAnimationKey()
  }

  render() {
    return (
      <div className={loaderStyle}>
        <Loader type={this.props.animationKey} active={true} />
      </div>
    );
  }
}
