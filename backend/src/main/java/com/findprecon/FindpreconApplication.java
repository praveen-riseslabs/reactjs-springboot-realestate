package com.findprecon;

import com.findprecon.service.impl.ServiceIMPL;
import jakarta.annotation.PostConstruct;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class FindpreconApplication {

	public static void main(String[] args) {
		SpringApplication.run(FindpreconApplication.class, args);


	}

	@Autowired
	private ServiceIMPL service;

	@PostConstruct
	public void init() {
		service.createDefaultUser();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:8086");
			}
		};
	}


	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

}
