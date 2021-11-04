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

type EditUserForm = Record<string, HTMLInputElement>;

export const EditUser = (props: EditUserProps): React.ReactElement => {
	const { id } = props.match.params;

	const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false);
	const [errorList, setErrorList] = useState<any>({});
	const [redirect, setRedirect] = useState(false);
	const {
		data: user,
		isLoading,
		error,
		doFetch,
	} = useFetch<UserType>(Endpoints.user(id));

	useEffect(() => {
		let isChanged = false;

		doFetch();

		// cleanup for unmounted console error
		return () => {
			isChanged = true;
		};
	}, []);

	/*
		const validate = (
			form: HTMLFormElement,
			formElements: Array<any>,
		): boolean => {
			const validationErrors = {} as Record<string, boolean>;

			formElements.forEach((element) => {
				validationErrors[element.name] = !element.validity.valid;
			});

			setErrorList(validationErrors);

			return form.checkValidity();
		};
	*/

	const formHasChanged = ({
		emailAddress,
		firstName,
		lastName,
		audienceInsight_optIn,
	}: EditUserForm): boolean => {
		const userDetails = [
			user.emailAddress,
			user.firstName,
			user.lastName,
			user.allowContactMe,
		];
		const formDetails = [
			emailAddress.value,
			firstName.value,
			lastName.value,
			audienceInsight_optIn.checked,
		];

		const valuesAreDifferent = !!userDetails.filter(
			(x) => !formDetails.includes(x),
		).length;

		return valuesAreDifferent;
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void | boolean> => {
		e.preventDefault();

		setIsSaveButtonLoading(true);

		const form = e.currentTarget;
		const { emailAddress, firstName, lastName, audienceInsight_optIn } = form;

		if (!form.checkValidity()) {
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
				userId: id,
				emailAddress: emailAddress.value,
				firstName: firstName.value,
				lastName: lastName.value,
				allowContactMe: audienceInsight_optIn.checked,
			}),
		};

		await doFetch(Endpoints.user(id), fetchOptions);

		setRedirect(true);

		setIsSaveButtonLoading(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const formElement = e.currentTarget;
		const validationErrors = { ...errorList };

		if (validationErrors[formElement.name] && formElement.validity.valid) {
			validationErrors[formElement.name] = false;
		}

		setErrorList(validationErrors);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
		const formElement = e.currentTarget;
		const validationErrors = { ...errorList };

		validationErrors[formElement.name] = !formElement.validity.valid;

		setErrorList(validationErrors);
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
					{isLoading && !isSaveButtonLoading ? (
						<>
							<PageHeader preheading="Confirm" heading="Edit user" />
							<p>Loading...</p>
						</>
					) : (
						<>
							{redirect && <Redirect to={`/users/${id}`} />}

							<PageHeader
								preheading="Personal details for"
								heading={`${user.firstName} ${user.lastName}`}
							/>
							<Grid>
								<GridItem cols={12} md={4}>
									<form onSubmit={handleSubmit} noValidate>
										<Input
											label="Email address"
											name="emailAddress"
											type="email"
											required
											onBlur={handleBlur}
											onChange={handleChange}
											error={errorList.emailAddress}
											errorMessage="Email address is in an invalid format"
											defaultValue={user.emailAddress}
										/>
										<Input
											label="First name"
											name="firstName"
											type="text"
											required
											minLength="2"
											maxLength="100"
											pattern="^((?![<>]).)*$"
											onBlur={handleBlur}
											onChange={handleChange}
											error={errorList.firstName}
											errorMessage="First name should contain letters and should not exceed 100 characters"
											defaultValue={user.firstName}
										/>
										<Input
											label="Last name"
											name="lastName"
											type="text"
											required
											minLength="2"
											maxLength="100"
											pattern="^((?![<>]).)*$"
											onBlur={handleBlur}
											onChange={handleChange}
											error={errorList.lastName}
											errorMessage="Last name should contain letters and should not exceed 100 characters"
											defaultValue={user.lastName}
										/>

										<div className="form-group-container form-group-container--no-border">
											<FormGroup
												legend="Audience insight community membership"
												name="audienceInsight"
											>
												<Radio
													value="optIn"
													label="Opt in"
													defaultChecked={user.allowContactMe}
												/>
												<Radio
													value="optOut"
													label="Opt out"
													defaultChecked={!user.allowContactMe}
												/>
											</FormGroup>
											<Button
												data-qa-sel="edit-user-profile"
												variant="cta"
												type="submit"
												disabled={isLoading}
											>
												Save profile
											</Button>
											<Button
												to={`/users/${id}`}
												variant="secondary"
												elementType={Link}
												disabled={isLoading}
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
				<ErrorMessage error={error}></ErrorMessage>
			)}
		</>
	);
};
