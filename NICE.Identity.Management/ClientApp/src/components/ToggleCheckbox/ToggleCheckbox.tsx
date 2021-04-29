import React from "react";

type ToggleCheckboxProps = {
	id: number;
	name: string;
	description: string;
	isSelected: boolean;
	isDisabled: boolean;
	onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ToggleCheckbox = (props: ToggleCheckboxProps): React.ReactElement => (
	<>
		<div className="checkbox">
			<input
				type="checkbox"
				className="checkbox__input"
				id={props.name.replace(/ /g, '')}
				name="service-role"
				value={props.id}
				checked={props.isSelected}
				disabled={props.isDisabled}
				onChange={props.onCheckboxChange}
			/>
			<label className="checkbox__label mb--0" htmlFor={props.name.replace(/ /g, '')}>
				{props.name}
			</label>
			<span className="checkbox__hint">{props.description}</span>
		</div>
	</>
);
