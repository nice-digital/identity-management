import React, { Component, ElementType } from "react";
import { Panel } from "@nice-digital/nds-panel";
import { Input } from "@nice-digital/nds-input";
import styles from "./FilterSuggestions.module.scss";

type SuggestionRefsType = Record<string, React.RefObject<HTMLLIElement>>;

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
	suggestionIdPrefix: string;
	dropdownRef: any;
	suggestionRefs: any;

	constructor(props: FilterSuggestionsProps<T>) {
		super(props);

		this.state = {
			activeSuggestionIndex: 0,
		};

		this.suggestionIdPrefix = "suggestion";
		this.dropdownRef = React.createRef<HTMLUListElement>();
		this.suggestionRefs = {} as SuggestionRefsType;

		for (let i = 1; i <= Object.keys(this.props.data).length; i++) {
			this.suggestionRefs[`${this.suggestionIdPrefix}${i}`] = React.createRef();
		}
	}

	typingTimer = 0;

	componentDidUpdate(prevProps: FilterSuggestionsProps<T>): void {
		if (prevProps.data !== this.props.data) {
			this.suggestionRefs = {};

			for (let i = 1; i <= Object.keys(this.props.data).length; i++) {
				this.suggestionRefs[`${this.suggestionIdPrefix}${i}`] =
					React.createRef();
			}
		}
	}

	setSuggestionsScroll = (activeSuggestionIndex: number, key: string): void => {
		const dropdown = this.dropdownRef.current;
		const activeSuggestion =
			this.suggestionRefs[this.suggestionIdPrefix + activeSuggestionIndex]
				?.current;

		if (activeSuggestion) {
			const activeSuggestionPosition = [
				activeSuggestion.offsetTop,
				activeSuggestion.offsetTop + activeSuggestion.offsetHeight,
			];

			const activeSuggestionIsInRange =
				activeSuggestionPosition.filter(
					(num) =>
						num >= dropdown.scrollTop &&
						num <= dropdown.scrollTop + dropdown.offsetHeight,
				).length === 2;

			if (!activeSuggestionIsInRange) {
				dropdown.scrollTop =
					key === "ArrowUp"
						? activeSuggestionPosition[0]
						: activeSuggestionPosition[1] - dropdown.offsetHeight;
			}
		}
	};

	handleInputKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
	): void | boolean => {
		const key = e.key;
		const suggestions = this.props.data;
		const suggestionsCount = suggestions.length;
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

			this.setSuggestionsScroll(activeSuggestionIndex, key);
		}

		this.setState({ activeSuggestionIndex });
	};

	handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const val = e.target.value.trim();

		clearTimeout(this.typingTimer);

		this.typingTimer = window.setTimeout(() => {
			if (val.length >= 3) {
				this.props.onInputChange(val);
			} else {
				this.props.onResultClick({} as T);
			}
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
					<ul ref={this.dropdownRef}>
						{data.map((item, index) => {
							const suggestionId = `${this.suggestionIdPrefix}${index + 1}`;

							return (
								<li
									key={index}
									data-qa-sel={`suggestions-for-${qaSelExtract}`}
									ref={this.suggestionRefs[suggestionId]}
									className={
										activeSuggestionIndex === index + 1 ? styles.active : ""
									}
								>
									<ElementType
										item={item}
										onClick={onResultClick}
										onMouseOver={this.setActiveSuggestionIndex}
										id={suggestionId}
									/>
								</li>
							);
						})}
					</ul>
				</div>
			</Panel>
		);
	}
}
