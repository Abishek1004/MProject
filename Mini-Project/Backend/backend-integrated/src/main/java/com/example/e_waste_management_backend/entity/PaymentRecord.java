package com.example.e_waste_management_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * PickupRecord — replaces PaymentRecord.
 *
 * Razorpay fields (razorpay_order_id, razorpay_payment_id, razorpay_signature)
 * have been removed. The table now tracks free pickup scheduling requests.
 *
 * Note: The table name is kept as "payment_records" so no migration is needed
 * for existing databases; the new columns will be added by Hibernate on startup.
 */
@Entity
@Table(name = "payment_records")
public class PaymentRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference_id", unique = true)
    private String referenceId;   // e.g. ECO-A1B2C3D4

    @Column(name = "amount")
    private Double amount;        // estimated recycle value in INR

    @Column(name = "status")
    private String status;        // SCHEDULED | COMPLETED | CANCELLED

    @Column(name = "device_variant")
    private String deviceVariant;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) this.status = "SCHEDULED";
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────
    public Long   getId()            { return id; }
    public void   setId(Long id)     { this.id = id; }

    public String getReferenceId()               { return referenceId; }
    public void   setReferenceId(String refId)   { this.referenceId = refId; }

    public Double  getAmount()               { return amount; }
    public void    setAmount(Double amount)  { this.amount = amount; }

    public String getStatus()              { return status; }
    public void   setStatus(String status) { this.status = status; }

    public String getDeviceVariant()                   { return deviceVariant; }
    public void   setDeviceVariant(String deviceVariant){ this.deviceVariant = deviceVariant; }

    public String getUserEmail()               { return userEmail; }
    public void   setUserEmail(String email)   { this.userEmail = email; }

    public LocalDateTime getCreatedAt()                     { return createdAt; }
    public void          setCreatedAt(LocalDateTime created){ this.createdAt = created; }
}
