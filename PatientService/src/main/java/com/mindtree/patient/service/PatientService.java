package com.mindtree.patient.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mindtree.patient.VO.PatientWithDoctor;
import com.mindtree.patient.entity.Patient;
import com.mindtree.patient.exception.CustomException;

@Service
public interface PatientService {

	Patient add(Patient patient);
	List<PatientWithDoctor> searchById(long id) throws CustomException;
	List<PatientWithDoctor> listWithDoctor();
	int numberOfPatientInDoctor(long docId);
}
