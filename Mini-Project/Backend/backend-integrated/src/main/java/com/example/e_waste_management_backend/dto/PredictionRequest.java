package com.example.e_waste_management_backend.dto;

public class PredictionRequest {
    public String brand;
    public int age_years;
    public int ram_gb;
    public int storage_gb;
    public int battery_power;

    public int original_box;
    public int original_charger;

    public String front_glass_status;
    public String back_glass_status;

    public String display_defect;
    public String body_defect;
    public String faults;
}
