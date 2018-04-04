package com.example.microservicesandtesting.features;

import com.example.microservicesandtesting.models.User;
import com.example.microservicesandtesting.repostitories.UserRepository;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static io.restassured.http.ContentType.JSON;
import static io.restassured.RestAssured.*;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.core.Is.is;


import java.util.stream.Stream;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UsersApiFeatureTest {

    @Autowired
    private UserRepository userRepository;

    @Before
    public void setUp() {
        userRepository.deleteAll();
    }

    @After
    public void tearDown() {
        userRepository.deleteAll();
    }


//    public User(String businessName, String addressZip, String addressBorough, String addressCity) {



    @Test
    public void shouldAllowFullCrudForAUser() throws Exception {
        User firstUser = new User(
                "Starbucks",
                "1600 Pennsylvania Ave",
                "10010",
                "New York"
        );

        User secondUser = new User(
                "BestBuy",
                "1600 Northern Blvd",
                "10010",
                "New York"
        );

        Stream.of( firstUser, secondUser )
                .forEach( user -> {
                    userRepository.save( user );
                } );

        when()
                .get( "http://localhost:8080/users/" )
                .then()
                .statusCode( is( 200 ) )
                .and().body( containsString( "Star" ) )
                .and().body( containsString( "BestBuy" ) );

        // Test creating a User
        User userNotYetInDb = new User(
                "Cafe Bene",
                "1200 Northern Blvd",
                "10010",
                "New York"
        );

        given()
                .contentType(JSON)
                .and().body(userNotYetInDb)
                .when()
                .post("http://localhost:8080/users")
                .then()
                .statusCode(is(200));
//                .and().body(containsString("Bene"));

//
        // Test get all Users
        when()
                .get("http://localhost:8080/users/")
                .then()
                .statusCode(is(200))
                .and().body(containsString("Bene"))
                .and().body(containsString("Best"))
                .and().body(containsString("Star"));

//        // Test finding one user by ID
        when()
                .get("http://localhost:8080/users/" + secondUser.getId())
                .then()
                .statusCode(is(200))
                .and().body(containsString("Best"))
                .and().body(containsString("Northern"));

//        // Test updating a user
//        secondUser.setFirstName("changed_name");
//
        given()
//                .contentType(JSON)
//                .and().body(secondUser)
//                .when()
                .patch("http://localhost:8080/users/" + firstUser.getId())
                .then()
                .statusCode(is(200))
                .and().body(containsString("Starbucks"));
//
//        // Test deleting a user
        when()
                .delete("http://localhost:8080/users/" + secondUser.getId())
                .then()
                .statusCode(is(200));
//    }
    }
}
