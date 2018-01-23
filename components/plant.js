import linkState from 'linkstate';
import { Component } from 'preact';
import './plant.css';

export default class Plant extends Component {
	state = {
		nameCommon: 'Tomato, Amish Paste',
		nameScientific: 'Solanum lycopersicum',
    timeline: {
  		daysToGermination: 10,
  		daysToSeedling: 21,
  		daysToTransplant: 21,
  		daysToHarvest: 85,
  		daysToReharvest: 5,
  		numOfHarvests: 5,
    }
	};

	render(props, state) {
    let parsedState = {};

    Object.keys(state.timeline).map((key) => {
      parsedState[key] = parseInt(state.timeline[key], 10);
    });

		let {
			daysToGermination,
			daysToSeedling,
			daysToTransplant,
			daysToHarvest,
			daysToReharvest,
			numOfHarvests,
		} = parsedState;

		const totalDays = daysToGermination + daysToSeedling + daysToTransplant + daysToHarvest + (daysToReharvest * numOfHarvests);

		const totalDaysTil = {
			seedling: daysToGermination + daysToSeedling,
			transplant: daysToGermination + daysToSeedling + daysToTransplant,
			harvest: daysToGermination + daysToSeedling + daysToTransplant + daysToHarvest,
		};

		return (
			<div className="plant">
				<div className="options">
          {Object.keys(state.timeline).map(key => {
            return (
					    <label>{key}: <input type="number" value={state.timeline[key]} onInput={linkState(this, 'timeline.' + key)} /></label>
            );
          })}
				</div>
				<div className="timeline" style={{
					width: `${totalDays}em`,
					background:
						`linear-gradient(to right,
							#B0DEDB 0,
							#B0DEDB ${daysToGermination}em,
							#7f99bf ${daysToGermination}em,
							#7f99bf ${totalDaysTil.seedling}em,
							#475d7f ${totalDaysTil.seedling}em,
							#475d7f ${totalDaysTil.transplant}em,
							#172F53 ${totalDaysTil.transplant}em,
							#172F53 ${totalDaysTil.harvest}em,
							#000 ${totalDaysTil.harvest}em,
							#000 100%
							)`
					}}
				/>
			</div>
		);
	}
}
