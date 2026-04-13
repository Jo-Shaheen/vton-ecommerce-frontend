import { useState } from "react";
import { Phone, User } from "lucide-react";
import apiClient from "../../utils/apiClient";
import styles from "../../styles/GoogleOnboardingModal.module.css";

export default function GoogleOnboardingModal({ onComplete }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    street: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isNameValid =
    formData.firstName.trim().length > 0 && formData.lastName.trim().length > 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => {
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
    };

    if (formData.gender) {
      payload.gender = formData.gender;
    }

    if (formData.phoneNumber.trim()) {
      payload.phoneNumber = formData.phoneNumber.trim();
    }

    if (formData.street.trim()) {
      payload.shippingAddress = {
        street: formData.street.trim(),
        city: formData.city.trim(),
      };
    }

    return payload;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!isNameValid) {
      setError("First name and last name are required.");
      return;
    }

    if (formData.street.trim() && !formData.city.trim()) {
      setError("City is required when street address is provided.");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.post("/customers/onboarding", buildPayload());
      onComplete();
    } catch (requestError) {
      const backendMessage = requestError?.response?.data?.message;
      const message = Array.isArray(backendMessage)
        ? backendMessage.join(", ")
        : backendMessage || "Unable to complete onboarding.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modalCard}>
        <h2 className={styles.title}>Complete your profile</h2>
        <p className={styles.subtitle}>
          Just a few details to personalize AINAI.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="google-first-name" className={styles.label}>
                First Name
              </label>
              <div className={styles.inputWrapper}>
                <User className={styles.icon} size={18} />
                <input
                  id="google-first-name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="google-last-name" className={styles.label}>
                Last Name
              </label>
              <div className={styles.inputWrapper}>
                <User className={styles.icon} size={18} />
                <input
                  id="google-last-name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="google-gender" className={styles.label}>
              Gender
            </label>
            <select
              id="google-gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="google-phone" className={styles.label}>
              Phone Number
            </label>
            <div className={styles.inputWrapper}>
              <Phone className={styles.icon} size={18} />
              <input
                id="google-phone"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={styles.input}
                placeholder="+12025551234"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="google-street" className={styles.label}>
              Street Address
            </label>
            <input
              id="google-street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className={styles.inputNoIcon}
              placeholder="123 Main St"
            />
          </div>

          {formData.street.trim() && (
            <div className={styles.field}>
              <label htmlFor="google-city" className={styles.label}>
                City
              </label>
              <input
                id="google-city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={styles.inputNoIcon}
                placeholder="Cairo"
              />
            </div>
          )}

          {!isNameValid && (
            <p className={styles.error}>
              First name and last name are required.
            </p>
          )}
          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isNameValid || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Continue to AINAI"}
          </button>
        </form>
      </div>
    </div>
  );
}
