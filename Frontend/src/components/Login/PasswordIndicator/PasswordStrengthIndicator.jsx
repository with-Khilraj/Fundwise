import React, { useState, useEffect } from "react";
import "./PasswordStrengthIndicator.css";

const PasswordStrengthIndicator = ({ password }) => {
  const [strength, setStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('');

  const calculateStrength = (password) => {
    let strength = 0;

    // Criteria for increasing strength
    const lengthCriteria = password.length >= 8 && password.length <= 12;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const specialCharCriteria = /[@$!%*?&]/.test(password);

    // Increment strength based on criteria met
    if (lengthCriteria) strength += 20;
    if (uppercaseCriteria) strength += 20;
    if (lowercaseCriteria) strength += 20;
    if (numberCriteria) strength += 20;
    if (specialCharCriteria) strength += 20;

    setStrength(strength);

    // Set the strength label and color
    if (strength === 100) {
      setStrengthLabel('Strong Password');
    } else if (strength >= 60) {
      setStrengthLabel('Medium Password');
    } else if (password.length > 0) {
      setStrengthLabel('Weak Password');
    } else {
      setStrengthLabel(''); // No label when password is empty
    }
  };

  // Update strength whenever the password changes
  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  return (
    password.length > 0 && (
      <div className="password-strength-container">
        <div className="password-strength-bar">
          <div
            className="password-strength-bar-fill"
            style={{
              width: `${strength}%`,
              backgroundColor: strength === 100 ? "green" : strength >= 60 ? "orange" : "red",
            }}
          />
        </div>
        {strengthLabel && (
          <p className="password-strength-label" style={{ color: strength === 100 ? "green" : strength >= 60 ? "orange" : "red" }}>
            {strengthLabel}
          </p>
        )}
      </div>
    )
  );
};

export default PasswordStrengthIndicator;
