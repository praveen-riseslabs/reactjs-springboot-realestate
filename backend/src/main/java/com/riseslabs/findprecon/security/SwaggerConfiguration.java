package com.riseslabs.findprecon.security;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI openAPI(){
        return  new OpenAPI()
                .info(new Info().title("Real Estate API")
                        .description("This is real estate project developed by riseslabs")
                        .version("1.0")
                        .contact(new Contact().name("FindPreCon").email("findprecon@gmail.com").url("findprecon.com"))
                        .license(new License().name("Apache")))

                .externalDocs(new ExternalDocumentation().url("findprecon.com").description("this is external url"));
    }

}
