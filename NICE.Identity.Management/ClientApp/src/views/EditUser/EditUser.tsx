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
import { Endpoints } from "../../data/endpoints";
import { UserType } from "../../models/types";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

import "@nice-digital/nds-radio/scss/radio.scss";

type TParams = { id: string };
type EditUserProps = Record<string, unknown> & RouteComponentProps<TParams>;
type CustomError = {
	error: Error;
	status: number;
};
type FormDataType = Record<string, string | boolean | null>;

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

	const [formData, setFormData] = useState<FormDataType>({
		emailAddress: "",
		firstName: "",
		lastName: "",
		audienceInsight: null,
	});

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
					const updatedFormData = {
						emailAddress: userData.emailAddress,
						firstName: userData.firstName,
						lastName: userData.lastName,
						audienceInsight: userData.allowContactMe,
					};
					setUser(userData);
					setFormData(updatedFormData);

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

	const formHasChanged = (): boolean => {
		const formValuesAreDifferent = [
			user.emailAddress !== formData.emailAddress,
			user.firstName !== formData.firstName,
			user.lastName !== formData.lastName,
			user.allowContactMe !== formData.audienceInsight,
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
		const { emailAddress, firstName, lastName, audienceInsight } = formData;
		const validationErrors = { ...validationErrorList };
		const blockedArray = [...emailBlockedArray];
		const blockedEmailFound =
			Object.keys(checkBlockedArray(emailAddress as string)).length > 0;

		if (!form.checkValidity() || blockedEmailFound) {
			setIsSaveButtonLoading(false);
			return false;
		}

		if (!formHasChanged()) {
			setRedirect(true);
			return false;
		}

		const fetchOptions = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: Number(id),
				emailAddress: emailAddress,
				firstName: firstName,
				lastName: lastName,
				allowContactMe: audienceInsight,
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
					emailAddress: emailAddress as string,
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
		const formElement = e.target;
		const formElementName = formElement.name;
		let isNowValid = formElement.validity.valid;
		const updatedFormData = { ...formData };
		const validationErrors = { ...validationErrorList };

		updatedFormData[formElementName] =
			formElement.type === "radio"
				? !updatedFormData[formElementName]
				: formElement.value;

		if (validationErrors[formElementName] === true) {
			if (formElementName === "emailAddress") {
				const blockedEmail = checkBlockedArray(formElement.value);
				const message =
					Object.keys(emailBlockedPattern).length > 0
						? "Email address must be valid and end in '@nice.org.uk'"
						: "Email address is in an invalid format";
				isNowValid = isNowValid
					? Object.keys(blockedEmail).length === 0
					: false;
				setEmailBlockedCurrentMessage(blockedEmail.message || message);
			}

			if (isNowValid) {
				validationErrors[formElementName] = false;
			}
		}

		setFormData(updatedFormData);
		setValidationErrorList(validationErrors);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
		const formElement = e.target;
		const formElementName = formElement.name;
		let isNowValid = formElement.validity.valid;
		const validationErrors = { ...validationErrorList };

		if (formElementName === "emailAddress") {
			const blockedEmail = checkBlockedArray(formElement.value);
			const message =
				Object.keys(emailBlockedPattern).length > 0
					? "Email address must be valid and end in '@nice.org.uk'"
					: "Email address is in an invalid format";
			isNowValid = isNowValid ? Object.keys(blockedEmail).length === 0 : false;
			setEmailBlockedCurrentMessage(blockedEmail.message || message);
		}

		validationErrors[formElementName] = !isNowValid;

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
											value={formData.emailAddress}
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
											value={formData.firstName}
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
											value={formData.lastName}
											disabled={isSaveButtonLoading}
										/>

										<div className="form-group-container form-group-container--no-border">
											<FormGroup
												legend="Audience insight community membership"
												name="audienceInsight"
												disabled={isSaveButtonLoading}
												onChange={handleChange}
											>
												<Radio
													data-qa-sel="optIn-radio-edit-user"
													value="optIn"
													label="Opt in"
													checked={formData.audienceInsight}
												/>
												<Radio
													data-qa-sel="optOut-radio-edit-user"
													value="optOut"
													label="Opt out"
													checked={!formData.audienceInsight}
												/>
											</FormGroup>
											<Button
												data-qa-sel="save-button-edit-user"
												variant="cta"
												type="submit"
												disabled={isSaveButtonLoading}
											>
												{isSaveButtonLoading ? "Loading..." : "Save profile"}
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
