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
	const [redirect, setRedirect] = useState(false);

	const [validationErrorList, setValidationErrorList] = useState<any>({});
	const [emailBlockedArray, setEmailBlockedArray] = useState<
		Array<Record<string, string>>
	>([]);
	const [emailBlockedPattern, setEmailBlockedPattern] =
		useState<{ pattern: string }>(Object);
	const [emailBlockedCurrentMessage, setEmailBlockedCurrentMessage] =
		useState<string>("Email address is in an invalid format");

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
					const userData = data as UserType;
					setUser(userData);

					if (userData.emailAddress.indexOf("@nice.org.uk") > -1) {
						setEmailBlockedPattern({
							pattern: "^[A-Za-z0-9._%+-]+@nice.org.uk$",
						});
					}
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

	const checkBlockedArray = (emailAddress: string) => {
		const blockedEmail =
			emailBlockedArray.find((x) => x.emailAddress === emailAddress) || {};

		return blockedEmail;
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
		const blockedArray = [...emailBlockedArray];
		const blockedEmailFound =
			Object.keys(checkBlockedArray(emailAddress.value)).length > 0;

		if (!form.checkValidity() || blockedEmailFound) {
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
				validationErrors["emailAddress"] = true;
				blockedArray.push({
					emailAddress: emailAddress.value,
					message: errorObject.error.message,
				});

				setEmailBlockedArray(blockedArray);
				setEmailBlockedCurrentMessage(errorObject.error.message);
				setValidationErrorList(validationErrors);
			} else {
				setError(error);
			}
		}

		setIsSaveButtonLoading(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const formElement = e.currentTarget;
		const validationErrors = { ...validationErrorList };

		let isNowValid = formElement.validity.valid;

		if (validationErrors[formElement.name] === true) {
			if (formElement.name === "emailAddress") {
				const blockedEmail = checkBlockedArray(formElement.value);
				const message =
					Object.keys(emailBlockedPattern).length > 0
						? "Email address must end in '@nice.org.uk'"
						: "Email address is in an invalid format";
				isNowValid = isNowValid
					? Object.keys(blockedEmail).length === 0
					: false;
				setEmailBlockedCurrentMessage(blockedEmail.message || message);
			}

			if (isNowValid) {
				validationErrors[formElement.name] = false;
			}
		}

		setValidationErrorList(validationErrors);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
		const formElement = e.currentTarget;
		const validationErrors = { ...validationErrorList };

		let isNowValid = formElement.validity.valid;

		if (formElement.name === "emailAddress") {
			const blockedEmail = checkBlockedArray(formElement.value);
			const message =
				Object.keys(emailBlockedPattern).length > 0
					? "Email address must end in '@nice.org.uk'"
					: "Email address is in an invalid format";
			isNowValid = isNowValid ? Object.keys(blockedEmail).length === 0 : false;
			setEmailBlockedCurrentMessage(blockedEmail.message || message);
		}

		validationErrors[formElement.name] = !isNowValid;

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
											error={validationErrorList.emailAddress}
											errorMessage={emailBlockedCurrentMessage}
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
