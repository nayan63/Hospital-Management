package com.mindtree.patient.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mindtree.patient.entity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

	@Query(value="SELECT * FROM patient WHERE name LIKE %:name%",nativeQuery = true)
	List<Patient> findByName(String name);
	
	@Query(value="SELECT * FROM patient WHERE name=:name",nativeQuery = true)
	Patient byName(String name);

	@Query(value="SELECT * FROM patient WHERE id LIKE %:id%",nativeQuery = true)
	List<Patient> getByIds(long id);

	@Query(value="SELECT COUNT(id) AS noOfPatient FROM patient WHERE visited_doctor=:docId",nativeQuery = true)
	int countPatByDoc(long docId);

}
