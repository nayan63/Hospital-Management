package com.mindtree.doctor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mindtree.doctor.VO.DoctorWithPatient;
import com.mindtree.doctor.entity.Doctor;
import com.mindtree.doctor.exception.CustomException;
import com.mindtree.doctor.service.DoctorService;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins={"http://localhost:4200/"},
methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class DoctorController {

	@Autowired
	DoctorService docService;
	
	@PostMapping
	public Doctor add(@RequestBody Doctor doc)
	{
		return docService.add(doc);
	}
	
	@GetMapping
	public List<Doctor> list() throws CustomException
	{
		if(docService.list().isEmpty())
		{
			throw new CustomException("No doctor there in the database");
		}
		return docService.list();
		
	}
	
	@GetMapping("/search-by-id/{id}")
	public DoctorWithPatient getByID(@PathVariable long id) throws CustomException
	{
		try
		{
			return docService.getById(id);
		}
		catch(Exception e)
		{
			throw new CustomException(e.getMessage());
		}
	}
	
	@GetMapping("/search")
	public List<Doctor> getByName(@RequestParam String name)
	{
		return docService.getByName(name);
	}
	
	@PutMapping("/update/{id}")
	public Doctor update(@RequestBody Doctor doc,@PathVariable long id) throws CustomException
	{
		return docService.update(doc, id);
	}
	
	@DeleteMapping("/delete/{id}")
	public Doctor delete(@PathVariable long id) throws CustomException
	{
		return docService.delete(id);
	}
	
	@GetMapping("/get-name/{id}")
	public String getName(@PathVariable long id)
	{
		return docService.getName(id);
	}
	
}
