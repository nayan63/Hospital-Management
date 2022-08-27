package com.mindtree.doctor.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.mindtree.doctor.VO.DoctorWithPatient;
import com.mindtree.doctor.entity.Doctor;
import com.mindtree.doctor.exception.CustomException;
import com.mindtree.doctor.repository.DoctorRepository;
import com.mindtree.doctor.service.DoctorService;

@Component
public class DoctorImplement implements DoctorService {

	@Autowired
	DoctorRepository DocRepo;
	
	@Autowired
	RestTemplate restTemplate;
	
	@Override
	public Doctor add(Doctor doc) {
		return DocRepo.save(doc);
	}

	@Override
	public List<Doctor> list() {
		return DocRepo.findAll();
	}

	@Override
	public DoctorWithPatient getById(long id) throws CustomException {
		Optional<Doctor> userOP = DocRepo.findById(id);
		if(userOP.isPresent())
		{
			Doctor dc = userOP.get();
			Integer numberOfPateint = restTemplate.getForObject("http://PATIENT-SERVICE/patient/patient-of-doctor/"+id, Integer.class); 
			DoctorWithPatient DWP = 
					new DoctorWithPatient(dc.getId(),dc.getName(),dc.getAge(),dc.getGender(),dc.getSpecialist(),numberOfPateint);
			return DWP;
		}
		
		throw new CustomException("No such Doctor found in the database");
	}

	@Override
	public Doctor update(Doctor doc, long id) throws CustomException {
		Doctor getDoc = DocRepo.findById(id).get();
		if(getDoc!=null)
		{
			getDoc.setName(doc.getName());
			getDoc.setAge(doc.getAge());
			getDoc.setGender(doc.getGender());
			getDoc.setSpecialist(doc.getSpecialist());
			
			return DocRepo.save(getDoc);
		}
		
		throw new CustomException("No Doctor Found In Database");
	}

	@Override
	public Doctor delete(long id){
		Doctor doc = DocRepo.findById(id).get();
		
		DocRepo.deleteById(id);
		return doc;
	}

	@Override
	public List<Doctor> getByName(String name) {
		return DocRepo.finByName(name);
	}

	@Override
	public String getName(long id) {
		return DocRepo.getName(id);
	}

}
