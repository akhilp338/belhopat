package com.intl.persistance.repository;

import org.springframework.data.jpa.datatables.repository.DataTablesRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intl.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository< UserEntity, Long >  {

	public UserEntity findByUserName(String  userName);
	public UserEntity findByPassword(String  userName);


}
