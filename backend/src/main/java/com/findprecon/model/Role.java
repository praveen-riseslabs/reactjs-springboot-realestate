package com.findprecon.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.security.Permission;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@RequiredArgsConstructor
public enum Role {
	
	SUPER_ADMIN,
	ADMIN,
	DATA_ENTRY_USER,
	DATA_ANALYST_ADMIN,
	AGENT;

	public List<SimpleGrantedAuthority> getAuthorities() {
		SimpleGrantedAuthority authorities = new SimpleGrantedAuthority(this.name());
		return List.of(authorities);
	}
	
}
