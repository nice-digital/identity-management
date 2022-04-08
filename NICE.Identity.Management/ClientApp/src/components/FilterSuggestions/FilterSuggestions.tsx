import React, { Component, ElementType } from "react";
import { Panel } from "@nice-digital/nds-panel";
import { Input } from "@nice-digital/nds-input";
import styles from "./FilterSuggestions.module.scss";

type FilterSuggestionsProps<T> = {
	label: string;
	data: T[];
	qaSelExtract: string;
	onInputChange: (searchQuery: string) => void;
	onResultClick: (item: T) => void;
	elementType: ElementType;
};

type FilterSuggestionsState = {
	activeSuggestionIndex: number;
};

export class FilterSuggestions<T> extends Component<
	FilterSuggestionsProps<T>,
	FilterSuggestionsState
> {
	constructor(props: FilterSuggestionsProps<T>) {
		super(props);

		this.state = {
			activeSuggestionIndex: 0,
		};
	}

	typingTimer = 0;
	suggestionIdPrefix = "suggestion";

	handleInputKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
	): void | boolean => {
		const key = e.key;
		const suggestions = this.props.data;
		const suggestionsCount = suggestions.length > 3 ? 3 : suggestions.length;
		let activeSuggestionIndex = this.state.activeSuggestionIndex;

		if (!suggestionsCount) {
			return false;
		}

		if (key === "Enter") {
			const item = suggestions[activeSuggestionIndex - 1];
			this.props.onResultClick(item);
			activeSuggestionIndex = 0;
		}

		if (key === "ArrowUp" || key === "ArrowDown") {
			e.preventDefault();
			activeSuggestionIndex =
				key === "ArrowUp"
					? activeSuggestionIndex === 0
						? suggestionsCount
						: activeSuggestionIndex - 1
					: activeSuggestionIndex === suggestionsCount
					? 0
					: activeSuggestionIndex + 1;
		}

		this.setState({ activeSuggestionIndex });
	};

	handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const val = e.target.value.trim();

		clearTimeout(this.typingTimer);

		this.typingTimer = window.setTimeout(() => {
			this.props.onInputChange(val);
		}, 1000);
	};

	handleInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
		const focussedElementId = e.relatedTarget?.id || "";

		if (!focussedElementId.startsWith(this.suggestionIdPrefix)) {
			this.props.onResultClick({} as T);
		}

		this.setState({ activeSuggestionIndex: 0 });
	};

	setActiveSuggestionIndex = (index: number): void => {
		this.setState({ activeSuggestionIndex: index });
	};

	render(): JSX.Element {
		const {
			label,
			data,
			qaSelExtract,
			onResultClick,
			elementType: ElementType,
		} = this.props;
		const { activeSuggestionIndex } = this.state;

		return (
			<Panel>
				<Input
					type="search"
					label={label}
					name="filter-suggestions"
					onChange={this.handleInputChange}
					onBlur={this.handleInputBlur}
					onKeyDown={this.handleInputKeyDown}
					autoComplete="off"
					data-qa-sel="filter-suggestions-input"
					className={styles.noMargin}
				/>
				<div className={styles.suggestions}>
					<ul>
						{data.slice(0, 3).map((item, index) => (
							<li
								key={index}
								data-qa-sel={`suggestions-for-${qaSelExtract}`}
								className={
									activeSuggestionIndex === index + 1 ? styles.active : ""
								}
							>
								<ElementType
									item={item}
									onClick={onResultClick}
									onMouseOver={this.setActiveSuggestionIndex}
									id={`${this.suggestionIdPrefix}${index + 1}`}
								/>
							</li>
						))}
					</ul>
				</div>
			</Panel>
		);
	}
}
