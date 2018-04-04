package com.example.microservicesandtesting.models;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity @Table(name = "USERS")
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

    public User(String businessName, String addressZip, String addressBorough, String addressCity) {
        this.businessName = businessName;
        this.addressZip = addressZip;
        this.addressBorough = addressBorough;
        this.addressCity = addressCity;
    }
}
