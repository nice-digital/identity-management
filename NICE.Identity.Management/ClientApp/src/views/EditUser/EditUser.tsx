import React, { useEffect, useState } from "react";
import { RouteComponentProps, Link, Redirect } from "react-router-dom";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { FormGroup } from "@nice-digital/nds-form-group";
import { Input } from "@nice-digital/nds-input";
import { Radio } from "@nice-digital/nds-radio";
import { PageHeader } from "@nice-digital/nds-page-header";
import { useFetch } from "../../helpers/useFetch";
import { isDataError } from "../../helpers/isDataError";
import { Endpoints } from "../../data/endpoints";
import { UserType } from "../../models/types";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

import "@nice-digital/nds-radio/scss/radio.scss";

type TParams = { id: string };
type EditUserProps = Record<string, unknown> & RouteComponentProps<TParams>;
type EditUserForm = Record<string, HTMLInputElement>;
type CustomError = {
	error: Error;
	status: number;
};

export const EditUser = (props: EditUserProps): React.ReactElement => {
	const { id } = props.match.params;

	const [user, setUser] = useState<UserType>(Object);
	const [isLoading, setIsLoading] = useState(false);
	const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [validationErrorList, setValidationErrorList] = useState<any>({});
	const [emailBlockedPattern, setEmailBlockedPattern] =
		useState<{ pattern: string }>(Object);
	const [emailBlockedMessage, setEmailBlockedMessage] = useState<string>("");
	const [redirect, setRedirect] = useState(false);

	const doFetch = useFetch(Endpoints.user(id));

	useEffect(() => {
		let isMounted = true;

		(async () => {
			if (isMounted) {
				setIsLoading(true);
				const data = await doFetch<UserType>();

				if (containsError(data)) {
					const errorObject = data as CustomError;
					setError(errorObject.error);
				} else {
					setUser(data as UserType);
				}

				setIsLoading(false);
			}
		})();

		return () => {
			isMounted = true;
		};
	}, []);

	const containsError = (data: Record<string, unknown>) => {
		return Object.prototype.hasOwnProperty.call(data, "error");
	};

	const formHasChanged = (form: EditUserForm): boolean => {
		const formValuesAreDifferent = [
			user.emailAddress !== form.emailAddress.value,
			user.firstName !== form.firstName.value,
			user.lastName !== form.lastName.value,
			user.allowContactMe !== form.audienceInsight_optIn.checked,
		];

		if (formValuesAreDifferent.includes(true)) {
			return true;
		}

		return false;
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void | boolean> => {
		e.preventDefault();
		setIsSaveButtonLoading(true);

		const form = e.currentTarget;
		const { emailAddress, firstName, lastName, audienceInsight_optIn } = form;
		const validationErrors = { ...validationErrorList };

		if (!form.checkValidity()) {
			setIsSaveButtonLoading(false);
			return false;
		}

		if (!formHasChanged(form)) {
			setRedirect(true);
			return false;
		}

		const fetchOptions = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: Number(id),
				emailAddress: emailAddress.value,
				firstName: firstName.value,
				lastName: lastName.value,
				allowContactMe: audienceInsight_optIn.checked,
			}),
		};

		const data = await doFetch<UserType>(Endpoints.user(id), fetchOptions);

		if (!containsError(data)) {
			setUser(data as UserType);
			setRedirect(true);
		} else {
			const errorObject = data as CustomError;

			if (errorObject.status === 422) {
				validationErrors["emailAddressBlocked"] = true;
				setEmailBlockedPattern({
					pattern: updateEmailBlockedPattern(emailAddress.value),
				});
				setEmailBlockedMessage(errorObject.error.message);
				setValidationErrorList(validationErrors);
			} else {
				setError(error);
			}
		}

		setIsSaveButtonLoading(false);
	};

	const updateEmailBlockedPattern = (emailAddress: string): string => {
		const regexPattern = Object.prototype.hasOwnProperty.call(
			emailBlockedPattern,
			"pattern",
		)
			? emailBlockedPattern.pattern.replace("?!(", `?!(${emailAddress}|`)
			: `^(?!(${emailAddress})$).*`;

		return regexPattern;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const formElement = e.currentTarget;
		const validationErrors = { ...validationErrorList };

		if (validationErrors[formElement.name] && formElement.validity.valid) {
			validationErrors[formElement.name] = false;
		}

		if (
			formElement.name === "emailAddress" &&
			validationErrors["emailAddressBlocked"]
		) {
			validationErrors["emailAddressBlocked"] = false;
		}

		setValidationErrorList(validationErrors);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
		const formElement = e.currentTarget;
		const validationErrors = { ...validationErrorList };

		validationErrors[formElement.name] = !formElement.validity.valid;

		if (
			formElement.name === "emailAddress" &&
			Object.prototype.hasOwnProperty.call(emailBlockedPattern, "pattern")
		) {
			const pattern = new RegExp(emailDuplicatePattern.pattern);

			validationErrors["emailAddressDuplicate"] = !pattern.test(
				formElement.value,
			)
				? true
				: false;
		}

		setValidationErrorList(validationErrors);
	};

	const usernameBreadcrumb = isLoading
		? "Loading user details"
		: error
		? "Error"
		: `${user.firstName} ${user.lastName}`;

	return (
		<>
			<Breadcrumbs>
				<Breadcrumb
					data-qa-sel="breadcrumb-user-link"
					to="/users"
					elementType={Link}
				>
					Users
				</Breadcrumb>
				<Breadcrumb to={`/users/${id}`} elementType={Link}>
					{usernameBreadcrumb}
				</Breadcrumb>
				<Breadcrumb>Edit user</Breadcrumb>
			</Breadcrumbs>

			{!error ? (
				<>
					{isLoading ? (
						<>
							<PageHeader preheading="Confirm" heading="Edit user" />
							<p>Loading...</p>
						</>
					) : (
						<>
							{redirect && (
								<Redirect
									to={{
										pathname: `/users/${id}`,
										state: { hasBeenEdited: true },
									}}
								/>
							)}

							<PageHeader
								data-qa-sel="page-header-edit-user"
								preheading="Personal details for"
								heading={`${user.firstName} ${user.lastName}`}
							/>
							<Grid>
								<GridItem cols={12} md={6} lg={4}>
									<form onSubmit={handleSubmit} noValidate>
										<Input
											data-qa-sel="email-input-edit-user"
											label="Email address"
											name="emailAddress"
											type="email"
											required
											autoComplete="off"
											{...emailBlockedPattern}
											onBlur={handleBlur}
											onChange={handleChange}
											error={
												validationErrorList.emailAddress ||
												validationErrorList.emailAddressBlocked
											}
											// errorMessage={
											// 	validationErrorList.emailAddressBlocked
											// 		? "Email address is already in use"
											// 		: "Email address is in an invalid format"
											// }
											errorMessage={emailBlockedMessage}
											defaultValue={user.emailAddress}
											disabled={isSaveButtonLoading}
										/>
										<Input
											data-qa-sel="firstname-input-edit-user"
											label="First name"
											name="firstName"
											type="text"
											required
											autoComplete="off"
											minLength="2"
											maxLength="100"
											pattern="^((?![<>]).)*$"
											onBlur={handleBlur}
											onChange={handleChange}
											error={validationErrorList.firstName}
											errorMessage="First name should contain letters and should not exceed 100 characters"
											defaultValue={user.firstName}
											disabled={isSaveButtonLoading}
										/>
										<Input
											data-qa-sel="lastname-input-edit-user"
											label="Last name"
											name="lastName"
											type="text"
											required
											autoComplete="off"
											minLength="2"
											maxLength="100"
											pattern="^((?![<>]).)*$"
											onBlur={handleBlur}
											onChange={handleChange}
											error={validationErrorList.lastName}
											errorMessage="Last name should contain letters and should not exceed 100 characters"
											defaultValue={user.lastName}
											disabled={isSaveButtonLoading}
										/>

										<div className="form-group-container form-group-container--no-border">
											<FormGroup
												legend="Audience insight community membership"
												name="audienceInsight"
												disabled={isSaveButtonLoading}
											>
												<Radio
													data-qa-sel="optIn-radio-edit-user"
													value="optIn"
													label="Opt in"
													defaultChecked={user.allowContactMe}
												/>
												<Radio
													data-qa-sel="optOut-radio-edit-user"
													value="optOut"
													label="Opt out"
													defaultChecked={!user.allowContactMe}
												/>
											</FormGroup>
											<Button
												data-qa-sel="save-button-edit-user"
												variant="cta"
												type="submit"
												disabled={isSaveButtonLoading}
											>
												Save profile
											</Button>
											<Button
												to={`/users/${id}`}
												variant="secondary"
												elementType={Link}
												disabled={isSaveButtonLoading}
											>
												Cancel
											</Button>
										</div>
									</form>
								</GridItem>
							</Grid>
						</>
					)}
				</>
			) : (
				<ErrorMessage error={error} />
			)}
		</>
	);
};
