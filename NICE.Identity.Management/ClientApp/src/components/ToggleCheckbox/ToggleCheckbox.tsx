import React from "react";

type ToggleCheckboxProps = {
	id: number;
	name: string;
	isSelected: boolean;
	onCheckboxChange: () => void;
};

export const ToggleCheckbox = (props: ToggleCheckboxProps) => (
	<div className="checkbox" key={props.id}>
		<input
			type="checkbox"
			className="checkbox__input"
			id="service-role"
			name="service-role"
			value={props.id}
			checked={props.isSelected}
			onChange={props.onCheckboxChange}
		/>
		<label className="checkbox__label" htmlFor="service-role">
			{props.name}
		</label>
	</div>
);
