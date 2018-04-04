package com.example.usersapi.models;

import lombok.*;

import javax.persistence.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "business_name")
    private String businessName;

    @Column(name = "address_zip")
    private String addressZip;

    @Column(name = "address_borough")
    private String addressBorough;

    @Column(name = "address_city")
    private String addressCity;

    @Column(name = "notes")
    private String notes;

    public User(String businessName, String addressZip, String addressBorough, String addressCity, String notes) {
        this.businessName = businessName;
        this.addressZip = addressZip;
        this.addressBorough = addressBorough;
        this.addressCity = addressCity;
        this.notes = notes;
    }

}
