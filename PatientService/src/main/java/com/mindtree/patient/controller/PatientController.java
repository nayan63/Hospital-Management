package com.mindtree.patient.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mindtree.patient.VO.PatientWithDoctor;
import com.mindtree.patient.entity.Patient;
import com.mindtree.patient.exception.CustomException;
import com.mindtree.patient.service.PatientService;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins={"http://localhost:4200/"},
methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class PatientController {

	@Autowired
	PatientService pServe;

	@PostMapping
	public Patient add(@RequestBody Patient patient) {
		return pServe.add(patient);
	}
	
	@GetMapping("/search")
	public List<PatientWithDoctor> searchById(@RequestParam Long id) throws CustomException
	{
		try {
			return pServe.searchById(id);
		} catch (CustomException e) {
			throw new CustomException(e.getMessage());
		}
	}
	
	@GetMapping("/with-doctor")
	public List<PatientWithDoctor> listPatient()
	{
		return pServe.listWithDoctor();
	}
	
	@GetMapping("/patient-of-doctor/{docId}")
	public int numberOfPatientInDoctor(@PathVariable long docId)
	{
		return pServe.numberOfPatientInDoctor(docId);
	}
}
