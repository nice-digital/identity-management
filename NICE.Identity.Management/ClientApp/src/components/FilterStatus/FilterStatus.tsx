import React from "react";
import { Panel } from "@nice-digital/nds-panel";
//import { Radio } from "@nice-digital/nds-radio";
import "@nice-digital/nds-radio/scss/radio.scss";

type FilterStatusProps = {
	onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FilterStatus = (props: FilterStatusProps) => {
	return (
		<Panel>
			<h4>Show:</h4>
			<form>
				<div className="radio">
					<input
						className="radio__input"
						name="filter-status"
						type="radio"
						id="filter-status-all"
						value=""
						defaultChecked
						onChange={props.onCheckboxChange}
					/>
					<label className="radio__label" htmlFor="filter-status-all">
						All
					</label>
				</div>

				<div className="radio">
					<input
						className="radio__input"
						name="filter-status"
						type="radio"
						id="filter-status-active"
						value="active"
						onChange={props.onCheckboxChange}
					/>
					<label className="radio__label" htmlFor="filter-status-active">
						Active
					</label>
				</div>

				<div className="radio">
					<input
						className="radio__input"
						name="filter-status"
						type="radio"
						id="filter-status-locked"
						value="locked"
						onChange={props.onCheckboxChange}
					/>
					<label className="radio__label" htmlFor="filter-status-locked">
						Locked
					</label>
				</div>
			</form>
		</Panel>
	);
};
