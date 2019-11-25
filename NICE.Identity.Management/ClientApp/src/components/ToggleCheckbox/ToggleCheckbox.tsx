import React from "react";

type ToggleCheckboxProps = {
	id: number;
	name: string;
	isSelected: boolean;
	isDisabled: boolean;
	onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ToggleCheckbox = (props: ToggleCheckboxProps) => (
	<div className="checkbox">
		<input
			type="checkbox"
			className="checkbox__input"
			id="service-role"
			name="service-role"
			value={props.id}
			checked={props.isSelected}
			disabled={props.isDisabled}
			onChange={props.onCheckboxChange}
		/>
		<label className="checkbox__label" htmlFor="service-role">
			{props.name}
		</label>
	</div>
);
