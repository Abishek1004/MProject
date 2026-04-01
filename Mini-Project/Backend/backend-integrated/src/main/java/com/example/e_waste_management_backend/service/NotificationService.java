package com.example.e_waste_management_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;



@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpMail(String toEmail, String otp) {

        try {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Your Secure OTP | EcoLoop");

            String html =
                    "<div style='background-color:#f4f6f8;padding:40px 0;font-family:Arial,sans-serif;'>"

                            + "<div style='max-width:520px;background:#ffffff;margin:auto;"
                            + "border-radius:12px;padding:35px;box-shadow:0 4px 14px rgba(0,0,0,0.08);'>"

                            // Logo / Brand
                            + "<h1 style='color:#2e7d32;text-align:center;margin-bottom:10px;'>EcoLoop</h1>"
                            + "<p style='text-align:center;color:#777;font-size:14px;margin-top:0;'>"
                            + "Smart E-Waste. Cleaner Planet."
                            + "</p>"

                            + "<hr style='border:none;border-top:1px solid #eee;margin:25px 0;'>"

                            + "<p style='font-size:16px;'>Dear User,</p>"

                            + "<p style='font-size:15px;color:#555;'>"
                            + "Use the following One-Time Password to continue your secure authentication."
                            + "</p>"

                            // OTP BOX ⭐⭐⭐⭐⭐
                            + "<div style='text-align:center;margin:30px 0;'>"
                            + "<span style='display:inline-block;font-size:32px;"
                            + "letter-spacing:6px;font-weight:bold;color:#2e7d32;"
                            + "background:#e8f5e9;padding:14px 26px;border-radius:10px;'>"
                            + otp +
                            "</span>"
                            + "</div>"

                            + "<p style='color:#666;font-size:14px;'>"
                            + "This OTP is valid for <b>5 minutes</b>. "
                            + "For your security, please do not share this code with anyone."
                            + "</p>"

                            + "<p style='color:#666;font-size:14px;'>"
                            + "If you did not request this, you can safely ignore this email."
                            + "</p>"

                            + "<hr style='border:none;border-top:1px solid #eee;margin:30px 0;'>"

                            + "<p style='font-size:14px;color:#777;'>"
                            + "Regards,<br>"
                            + "<b style='color:#2e7d32;'>EcoLoop Security Team</b>"
                            + "</p>"

                            + "</div>"

                            // Footer
                            + "<p style='text-align:center;color:#999;font-size:12px;margin-top:18px;'>"
                            + "© 2026 EcoLoop. All rights reserved."
                            + "</p>"

                            + "</div>";

            helper.setText(html, true);

            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}







