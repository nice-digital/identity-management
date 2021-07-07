import React from "react";
import { Panel } from "@nice-digital/nds-panel";
//import { Radio } from "@nice-digital/nds-radio";
import "@nice-digital/nds-radio/scss/radio.scss";

type FilterStatusProps = {
	onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FilterStatus = (props: FilterStatusProps): React.ReactElement => {
	return (
		<Panel>
			<form>
				<div role="group" aria-labelledby="filter-header">
					<div id="filter-header">
						<strong>Show:</strong>
					</div>
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
							<span className="visually-hidden">Show: </span>
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
							id="filter-status-pending"
							value="pending"
							onChange={props.onCheckboxChange}
						/>
						<label className="radio__label" htmlFor="filter-status-pending">
							Pending
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
				</div>
			</form>
		</Panel>
	);
};
