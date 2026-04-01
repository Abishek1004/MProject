package com.example.e_waste_management_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "pickup_requests")
public class PickupRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cart_item_variant")
    private String cartItemVariant;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "scheduled_date")
    private LocalDate scheduledDate;

    @Column(name = "time_slot")
    private String timeSlot;

    // SCHEDULED | CONFIRMED | COMPLETED
    @Column(name = "status")
    private String status;

    @Column(name = "final_price")
    private Integer finalPrice;

    @Column(name = "address")
    private String address;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) this.status = "SCHEDULED";
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCartItemVariant() { return cartItemVariant; }
    public void setCartItemVariant(String cartItemVariant) { this.cartItemVariant = cartItemVariant; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public LocalDate getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDate scheduledDate) { this.scheduledDate = scheduledDate; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getFinalPrice() { return finalPrice; }
    public void setFinalPrice(Integer finalPrice) { this.finalPrice = finalPrice; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
