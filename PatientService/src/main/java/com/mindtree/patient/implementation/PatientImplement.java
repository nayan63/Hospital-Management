package com.mindtree.patient.implementation;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.mindtree.patient.VO.PatientWithDoctor;
import com.mindtree.patient.entity.Patient;
import com.mindtree.patient.exception.CustomException;
import com.mindtree.patient.repository.PatientRepository;
import com.mindtree.patient.service.PatientService;

@Component
public class PatientImplement implements PatientService {

	@Autowired
	PatientRepository pRepo;
	
	@Autowired
	RestTemplate restTemplate;
	
	@Override
	public Patient add(Patient patient) {
		return pRepo.save(patient);
	}

	@Override
	public List<PatientWithDoctor> searchById(long id) throws CustomException {
		List<Patient> listPatient = pRepo.getByIds(id);
		if(listPatient.size()>0)
		{
			List<PatientWithDoctor> listPWD = new ArrayList<PatientWithDoctor>();
			Iterator<Patient> itr = listPatient.iterator();
			
			while(itr.hasNext())
			{
				Patient patient = itr.next();
				String doctorName = restTemplate.getForObject("http://DOCTOR-SERVICE/doctor/get-name/"+patient.getVisitedDoctor(), String.class);
				PatientWithDoctor pwd = new PatientWithDoctor();
				pwd.setId(patient.getId());
				pwd.setName(patient.getName());
				pwd.setAge(patient.getAge());
				pwd.setDataOfVist(patient.getDataOfVist());
				pwd.setVisitedDoctor(doctorName);
				pwd.setPrescription(patient.getPrescription());
				
				listPWD.add(pwd);
			}
			return listPWD;
		}
		
		throw new CustomException("No Patient Found With ID "+id);
		
	}

	@Override
	public List<PatientWithDoctor> listWithDoctor() {
		
		List<PatientWithDoctor> listPWD = new ArrayList<PatientWithDoctor>();
		List<Patient> listPatient = pRepo.findAll();
		Iterator<Patient> itr = listPatient.iterator();
		
		while(itr.hasNext())
		{
			Patient patient = itr.next();
			String doctorName = restTemplate.getForObject("http://DOCTOR-SERVICE/doctor/get-name/"+patient.getVisitedDoctor(), String.class);
			PatientWithDoctor pwd = new PatientWithDoctor();
			pwd.setId(patient.getId());
			pwd.setName(patient.getName());
			pwd.setAge(patient.getAge());
			pwd.setDataOfVist(patient.getDataOfVist());
			pwd.setVisitedDoctor(doctorName);
			pwd.setPrescription(patient.getPrescription());
			
			listPWD.add(pwd);
		}
		return listPWD;
	}

	@Override
	public int numberOfPatientInDoctor(long docId) {
		return pRepo.countPatByDoc(docId);
	}

}
