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

//    business_name VARCHAR(100),
//    address_zip VARCHAR(100),
//    address_borough VARCHAR(100),
//    address_city VARCHAR(100)

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

//    @Column(name = "USER_NAME")
//    private String userName;
//
//    @Column(name = "FIRST_NAME")
//    private String firstName;
//
//    @Column(name = "LAST_NAME")
//    private String lastName;
//
//    public User(String userName, String firstName, String lastName) {
//        this.userName = userName;
//        this.firstName = firstName;
//        this.lastName = lastName;
//    }

}
