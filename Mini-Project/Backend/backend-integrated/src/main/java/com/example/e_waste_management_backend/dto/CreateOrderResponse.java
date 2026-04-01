package com.example.e_waste_management_backend.dto;

/**
 * PickupConfirmationResponse — replaces CreateOrderResponse (Razorpay removed).
 *
 * Returned by POST /api/payment/schedule-pickup
 */
public class CreateOrderResponse {
    private String referenceId;
    private String status;
    private String device;
    private Double estimatedValue;
    private String message;

    public CreateOrderResponse() {}

    public CreateOrderResponse(String referenceId, String status, String device,
                                Double estimatedValue, String message) {
        this.referenceId    = referenceId;
        this.status         = status;
        this.device         = device;
        this.estimatedValue = estimatedValue;
        this.message        = message;
    }

    public String getReferenceId()                { return referenceId; }
    public void   setReferenceId(String ref)      { this.referenceId = ref; }

    public String getStatus()                     { return status; }
    public void   setStatus(String status)        { this.status = status; }

    public String getDevice()                     { return device; }
    public void   setDevice(String device)        { this.device = device; }

    public Double  getEstimatedValue()            { return estimatedValue; }
    public void    setEstimatedValue(Double val)  { this.estimatedValue = val; }

    public String getMessage()                    { return message; }
    public void   setMessage(String message)      { this.message = message; }
}
