package com.mindtree.doctor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mindtree.doctor.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

	@Query(value="SELECT * FROM doctor WHERE name LIKE %:name%",nativeQuery = true)
	List<Doctor> finByName(String name);
	
	@Query(value="SELECT * FROM doctor WHERE name=:name",nativeQuery = true)
	Doctor ByName(String name);
	
	@Query(value="SELECT name FROM doctor WHERE id=:id",nativeQuery = true)
	String getName(long id);

}
