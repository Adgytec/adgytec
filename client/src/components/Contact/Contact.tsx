import React, { useState } from "react";
import styles from "./contact.module.scss";
import { services } from "@data/services";

const Contact = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		mobile: "",
		services: "",
		more: "",
		otherService: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [err, setErr] = useState<null | string>(null);
	const [msg, setMsg] = useState<null | string>(null);

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (values.otherService.length !== 0) {
			setSubmitting(false);
			return;
		}

		setErr(null);
		setMsg(null);
		setSubmitting(true);

		try {
			const { name, email, mobile, services, more } = values;

			const reqBody = JSON.stringify({
				name,
				email,
				number: mobile,
				service: services,
				tellusmore: more,
			});

			const method = "POST";
			const url = "/contact-us";
			const res = await fetch(url, {
				method: method,
				headers: {
					"Content-Type": "application/json",
				},
				body: reqBody,
			});

			const serverResponse = await res.json();

			let { status, message } = serverResponse;

			setSubmitting(false);
			if (status === "error") {
				setErr(message);
				setMsg(null);
				window.location.href = "/reject";
			} else if (status === "successfull") {
				setMsg(message);
				setErr(null);
				window.location.href = "/success";
			}
		} catch (err) {
			setErr("Error submitting form right now. Please try again later.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div
			id="contact"
			data-theme="light"
			className={styles.contact_container}
		>
			<div>
				<div className={`container-wide ${styles.contact_heading}`}>
					<h2 className="h2">CONTACT</h2>

					<p className="text">We're excited to hear from you.</p>
				</div>

				<div className="container">
					<div className={styles.form} data-theme="dark">
						<div className={styles.form_item}>
							<h4 className="h4">Start Now.</h4>
							<img loading="lazy" src="/contact.webp" alt="" />
						</div>

						<div className={styles.form_item}>
							<h4 className="h5">
								Your Digital Transformation Partner
							</h4>

							<form
								onSubmit={handleFormSubmit}
								className={styles.contact_us_form}
							>
								<input
									required
									placeholder="*Name"
									type="text"
									name="name"
									value={values.name}
									onChange={(e) => {
										setValues((prev) => {
											return {
												...prev,
												name: e.target.value,
											};
										});
									}}
									disabled={submitting}
								/>
								<input
									required
									placeholder="*Email"
									type="email"
									name="email"
									value={values.email}
									onChange={(e) => {
										setValues((prev) => {
											return {
												...prev,
												email: e.target.value,
											};
										});
									}}
									disabled={submitting}
								/>
								<input
									required
									placeholder="*Mobile"
									type="tel"
									inputMode="numeric"
									pattern="[0-9]{10}"
									name="mobile"
									value={values.mobile}
									onChange={(e) => {
										setValues((prev) => {
											return {
												...prev,
												mobile: e.target.value,
											};
										});
									}}
									disabled={submitting}
								/>

								<select
									name="services"
									required
									value={values.services}
									onChange={(e) => {
										setValues((prev) => {
											return {
												...prev,
												services: e.target.value,
											};
										});
									}}
									disabled={submitting}
								>
									<option selected={true} value="" disabled>
										*What are you looking for?
									</option>
									{services.map((item) => {
										return (
											<option
												key={item.heading}
												value={item.heading}
											>
												{item.heading}
											</option>
										);
									})}
									<option value="Other">Other</option>
								</select>

								<textarea
									name="more"
									rows={4}
									cols={50}
									placeholder="Tell us more"
									value={values.more}
									onChange={(e) => {
										setValues((prev) => {
											return {
												...prev,
												more: e.target.value,
											};
										});
									}}
									disabled={submitting}
								></textarea>

								<div className={styles.other_service}>
									<input
										type="text"
										name="otherService"
										value={values.otherService}
										onChange={(e) => {
											setValues((prev) => {
												return {
													...prev,
													otherService:
														e.target.value,
												};
											});
										}}
										disabled={submitting}
									/>
								</div>

								{err && (
									<div className={styles.form_response}>
										<p className={styles.error}>{err}</p>
									</div>
								)}

								{msg && (
									<div className={styles.form_response}>
										<p className={styles.success}>{msg}</p>
									</div>
								)}

								<p className="subtext">
									Disclaimer: By clicking submit, you agree to
									receive communications from Adgytec in
									accordance with our
									<a
										href="/privacy-policy"
										target="_blank"
										data-type="link"
										data-variant="secondary"
									>
										Privacy Policy
									</a>
									.
								</p>

								<div>
									<button
										data-type="button"
										data-variant="secondary"
										type="submit"
										disabled={submitting}
									>
										{submitting
											? "Submitting..."
											: "Submit"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
