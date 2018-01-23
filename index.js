import './style';
import { Component } from 'preact';
import Plant from './components/plant';
import dragNdrop from 'npm-dragndrop';
import linkState from 'linkstate';

const months = {
  'Jan': 31,
  'Feb': 28,
  'Mar': 31,
  'Apr': 30,
  'May': 31,
  'June': 30,
  'July': 31,
  'Aug': 31,
  'Sept': 30,
  'Oct': 31,
  'Nov': 30,
  'Dec': 31
};

export default class App extends Component {
  state = {
    lastFreezeDate: 70
  }

  componentDidMount () {
    dragNdrop({
      element: document.querySelector('.plant .timeline'),
      constraints: 'x'
    });
  }

	render({}, {lastFreezeDate}) {
		return (
			<div class="container">
        <label>Last Freeze Date: <input type="number" value={lastFreezeDate} onInput={linkState(this, 'lastFreezeDate')} /></label>
        <div class="bed">
          <Plant />
        </div>
        <div class="year">
          {Object.keys(months).map(key => {
            return (
              <div style={{ width: `${months[key]}em` }} class="month">{key}</div>
            );
          })}
          <div class="freezeDate" style={{ left: `${parseInt(lastFreezeDate, 10)}em` }}></div>
        </div>
			</div>
		);
	}
}
