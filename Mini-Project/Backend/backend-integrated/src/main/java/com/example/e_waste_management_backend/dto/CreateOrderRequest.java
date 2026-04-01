package com.example.e_waste_management_backend.dto;

/**
 * PickupRequest DTO — replaces CreateOrderRequest (Razorpay removed).
 *
 * Used by POST /api/payment/schedule-pickup
 */
public class CreateOrderRequest {
    private Double amount;        // estimated recycle value in INR
    private String deviceVariant;
    private String userEmail;
    private String contactNumber;
    private String pickupAddress;

    public CreateOrderRequest() {}

    public Double  getAmount()                  { return amount; }
    public void    setAmount(Double amount)     { this.amount = amount; }

    public String getDeviceVariant()                      { return deviceVariant; }
    public void   setDeviceVariant(String deviceVariant)  { this.deviceVariant = deviceVariant; }

    public String getUserEmail()               { return userEmail; }
    public void   setUserEmail(String email)   { this.userEmail = email; }

    public String getContactNumber()                    { return contactNumber; }
    public void   setContactNumber(String contactNumber){ this.contactNumber = contactNumber; }

    public String getPickupAddress()                    { return pickupAddress; }
    public void   setPickupAddress(String pickupAddress){ this.pickupAddress = pickupAddress; }
}
