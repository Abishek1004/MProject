package com.example.e_waste_management_backend.dto;

/**
 * VerifyPaymentRequest — kept for backward compatibility but no longer used
 * now that Razorpay has been removed.
 *
 * All razorpay_* fields have been replaced with a simple referenceId field
 * for potential future use.
 */
public class VerifyPaymentRequest {
    private String referenceId;
    private String userEmail;
    private String deviceVariant;

    public VerifyPaymentRequest() {}

    public String getReferenceId()                 { return referenceId; }
    public void   setReferenceId(String refId)     { this.referenceId = refId; }

    public String getUserEmail()               { return userEmail; }
    public void   setUserEmail(String email)   { this.userEmail = email; }

    public String getDeviceVariant()                      { return deviceVariant; }
    public void   setDeviceVariant(String deviceVariant)  { this.deviceVariant = deviceVariant; }
}
