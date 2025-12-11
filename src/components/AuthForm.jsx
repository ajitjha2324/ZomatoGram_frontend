import React from "react";
import { Link } from "react-router-dom";
import "../styles/shared.css";

const AuthForm = ({ formType = "login", userType = "user", onSubmit }) => {
  const isRegister = formType === "register";
  const isFoodPartner = userType === "food-partner";

  const title = isRegister
    ? isFoodPartner
      ? "Partner Registration"
      : "Create your account"
    : isFoodPartner
    ? "Partner Sign In"
    : "Welcome back";

  const subtitle = isRegister
    ? isFoodPartner
      ? "Register your restaurant to start receiving orders."
      : "Create an account to order your favorite meals."
    : isFoodPartner
    ? "Sign in to manage your restaurant and orders."
    : "Sign in to continue to ZomatoGram.";

  return (
    <div className="auth-card">
      <div className="auth-left">
        <div className="brand-title">ZomatoGram</div>
      </div>

      <div className="auth-right">
        {/* IMPORTANT: Now we use onSubmit passed from parent */}
        <form className="auth-form" onSubmit={onSubmit}>
          <h2>{title}</h2>
          <p>{subtitle}</p>

          {isRegister && !isFoodPartner && (
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full name</label>
              <input className="form-input" name="name" id="name" />
            </div>
          )}

          {isRegister && isFoodPartner && (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="restaurantName">Restaurant name</label>
                <input className="form-input" name="restaurantName" id="restaurantName" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactName">Contact Person</label>
                <input className="form-input" name="contactName" id="contactName" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">Address</label>
                <input className="form-input" name="address" id="address" />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input className="form-input" name="email" id="email" type="email" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-input" type="password" name="password" id="password" />
          </div>

          {isRegister && (
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone</label>
              <input className="form-input" name="phone" id="phone" />
            </div>
          )}

          <div className="auth-actions">
            <button type="submit" className="auth-button">
              {isRegister ? "Create account" : "Sign in"}
            </button>
          </div>

          {!isRegister && (
            <div className="auth-links">
              <Link to="/user/register">Register as normal user</Link> | 
              <Link to="/food-partner/register">Register as food partner</Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
