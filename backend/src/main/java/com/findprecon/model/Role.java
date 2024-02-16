package com.findprecon.model;

import lombok.Getter;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.security.Permission;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public enum Role {
	
	SUPER_ADMIN,
	ADMIN,
	DATA_ENTRY_USER,
	DATA_ANALYST_ADMIN,
	AGENT;


	
}
